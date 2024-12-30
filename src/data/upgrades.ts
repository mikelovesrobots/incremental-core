import type { UpgradeDefinition, PlayerState } from "../definitions";

export const findVisibleUpgrades = (
  upgradeDefinitions: UpgradeDefinition[],
  playerState: PlayerState
): UpgradeDefinition[] =>
  upgradeDefinitions.filter((upgradeDefinition) =>
    upgradeDefinition.unlockCondition(playerState)
  );

export const findUpgradeById = (
  upgradeDefinitions: UpgradeDefinition[],
  id: string
) => upgradeDefinitions.find((upgradeDefinition) => upgradeDefinition.id == id);
