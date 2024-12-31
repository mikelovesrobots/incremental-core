import { GeneratorDefinition, PlayerState, UpgradeDefinition } from "@/types";
import Decimal from "decimal.js";

export const calculateProduction = (
  generator: GeneratorDefinition,
  playerState: PlayerState,
  upgradeDefinitions: UpgradeDefinition[]
): Decimal => {
  const ownedGenerators = playerState.generators[generator.id].owned;
  let production = generator.baseProduction.mul(ownedGenerators);

  upgradeDefinitions.forEach((upgrade) => {
    const ownedUpgrades = playerState.upgrades[upgrade.id].owned;
    if (upgrade.generatorId === generator.id && ownedUpgrades.greaterThan(0)) {
      for (const effect of upgrade.effects) {
        if (effect.type === "multiply") {
          production = production.mul(effect.value.pow(ownedUpgrades));
        }
      }
    }
  });

  // Apply prestige bonus
  production = production.mul(playerState.prestigeBonuses.productionMultiplier);

  return production;
};
