import {
  applyPrestigeBonus,
  resetResources,
  resetGenerators,
  resetUpgrades,
} from "@/index";
import type { PrestigeDefinition, PlayerState } from "@/types";

export const canPrestige = (
  prestigeDefinition: PrestigeDefinition,
  state: PlayerState
): boolean => prestigeDefinition.unlockCondition(state);

// Prestiges the player if possible, returning true if successful
export const prestige = (
  prestigeDefinition: PrestigeDefinition,
  state: PlayerState
): boolean => {
  if (!canPrestige(prestigeDefinition, state)) {
    return false;
  }

  applyPrestigeBonus(prestigeDefinition, state);
  resetResources(state);
  resetGenerators(state);
  resetUpgrades(state);

  return true;
};
