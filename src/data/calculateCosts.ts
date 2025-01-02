import { getOwnedGeneratorsCount, getOwnedUpgradesCount } from "@/index";
import {
  CostDefinition,
  GeneratorDefinition,
  PlayerState,
  UpgradeDefinition,
} from "@/types";
import Decimal from "decimal.js";

export const getGeneratorCost = (
  generator: GeneratorDefinition,
  playerState: PlayerState
) => {
  const owned = getOwnedGeneratorsCount(playerState, generator.id);
  return calculateCost(generator.cost, owned);
};

export const getUpgradeCost = (
  upgrade: UpgradeDefinition,
  playerState: PlayerState
) => {
  const owned = getOwnedUpgradesCount(playerState, upgrade.id);
  return calculateCost(upgrade.cost, owned);
};

const calculateCost = ({ base, scaling }: CostDefinition, owned: Decimal) => {
  return base.mul(scaling.pow(owned));
};
