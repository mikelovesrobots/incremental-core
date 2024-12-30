import Decimal from "decimal.js";

type ResourceType = string;
type GeneratorType = string;
type UpgradeType = string;

export interface PlayerState {
  resources: {
    [key: ResourceType]: Decimal; // e.g., {"energy": new Decimal(0)}
  };
  generators: {
    [key: GeneratorType]: { owned: Decimal }; // e.g., {"solarPanel": { owned: new Decimal(0)}}
  };
  upgrades: {
    [key: UpgradeType]: { owned: Decimal }; // e.g., {"solarPanelEfficiency": { owned: new Decimal(0)}}
  };
  prestigeBonuses: {
    productionMultiplier: Decimal; // e.g. new Decimal(1.0)
  };
}

export interface GeneratorDefinition {
  id: string; // e.g., "solarPanel"
  name: string; // e.g., "Solar Panel"
  baseProduction: Decimal; // e.g., "Base Production"
  resource: ResourceType; // e.g., "energy"
  cost: {
    base: Decimal; // e.g., new Decimal("1")
    scaling: Decimal; // e.g., new Decimal("1.15")
  };
  unlockCondition: (state: PlayerState) => boolean; // returns true if unlocked for this playerState
}

export enum StackingBehavior {
  additive,
  multiplicative,
}

export interface UpgradeEffect {
  type: "multiply"; // reserved for future types like sum
  resource: ResourceType; // e.g., "energy"
  value: Decimal; // e.g., new Decimal("2")
  stackingBehavior: StackingBehavior; // e.g., StackingBehavior.multiplicative
}

export interface UpgradeDefinition {
  id: string; // e.g., "solarPanelEfficiency",
  name: string; // e.g., "Solar Panel Efficiency",
  generatorId: GeneratorType; // e.g., "solarPanel",
  effects: UpgradeEffect[];
  cost: { base: 50; scaling: 1.2 };
  unlockCondition: (state: PlayerState) => boolean; // return true if unlocked for this playerState
}

export interface PrestigeDefinition {
  bonused: {
    productionMultiplier: (state: PlayerState) => Decimal; // e.g., (new Decimal(Math.floor(state.resources.energy / 1000) * 0.1)).plus(0.1)
  };
  unlockCondition: (state: PlayerState) => boolean; // return true if unlocked for this playerState
}
