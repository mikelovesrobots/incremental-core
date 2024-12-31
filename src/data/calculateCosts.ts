import { GeneratorDefinition, PlayerState, UpgradeDefinition } from "@/types";

export const calculateGeneratorCost = (
  generator: GeneratorDefinition,
  playerState: PlayerState
) => {
  const { base, scaling } = generator.cost;
  const owned = playerState.generators[generator.id].owned;
  return base.mul(scaling.pow(owned));
};

export const calculateUpgradeCost = (
  upgrade: UpgradeDefinition,
  playerState: PlayerState
) => {
  const { base, scaling } = upgrade.cost;
  const owned = playerState.upgrades[upgrade.id].owned;
  return base.mul(scaling.pow(owned));
};
