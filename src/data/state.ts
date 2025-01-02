import Decimal from "decimal.js";
import type { PrestigeDefinition, PlayerState } from "@/types";

export const applyPrestigeBonus = (
  prestigeDefinition: PrestigeDefinition,
  state: PlayerState
): void => {
  const newPrestigeBonus =
    prestigeDefinition.bonused.productionMultiplier(state);
  state.prestigeBonuses.productionMultiplier =
    state.prestigeBonuses.productionMultiplier.add(newPrestigeBonus);
};

export const resetGenerators = (state: PlayerState): void => {
  for (const generatorType in state.generators) {
    state.generators[generatorType].owned = new Decimal(0);
  }
};

export const resetResources = (state: PlayerState): void => {
  for (const resourceType in state.resources) {
    state.resources[resourceType] = new Decimal(0);
  }
};

export const resetUpgrades = (state: PlayerState): void => {
  for (const upgradeType in state.upgrades) {
    state.upgrades[upgradeType].owned = new Decimal(0);
  }
};

export const getOwnedGeneratorsCount = (
  playerState: PlayerState,
  generatorId: string
): Decimal => {
  return playerState.generators[generatorId]?.owned ?? new Decimal(0);
};

export const getOwnedUpgradesCount = (
  playerState: PlayerState,
  upgradeId: string
): Decimal => {
  return playerState.upgrades[upgradeId]?.owned ?? new Decimal(0);
};
