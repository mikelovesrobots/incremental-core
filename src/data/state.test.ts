import Decimal from "decimal.js";
import {
  applyPrestigeBonus,
  resetGenerators,
  resetResources,
  resetUpgrades,
} from "@/index";
import type { PlayerState, PrestigeDefinition } from "@/types";

describe("applyPrestigeBonus", () => {
  it("should correctly apply the prestige bonus to the player's state", () => {
    const mockPrestigeDefinition = {
      bonused: {
        productionMultiplier: jest.fn((state: PlayerState) => new Decimal(2)),
      },
    } as unknown as PrestigeDefinition;

    const mockPlayerState = {
      prestigeBonuses: {
        productionMultiplier: new Decimal(1),
      },
    } as unknown as PlayerState;

    applyPrestigeBonus(mockPrestigeDefinition, mockPlayerState);

    expect(
      mockPlayerState.prestigeBonuses.productionMultiplier.toNumber()
    ).toBe(3);
  });
});

describe("resetGenerators", () => {
  it("should reset all generators to zero", () => {
    const mockPlayerState = {
      generators: {
        generator1: { owned: new Decimal(10) },
        generator2: { owned: new Decimal(5) },
      },
    } as unknown as PlayerState;

    resetGenerators(mockPlayerState);

    expect(mockPlayerState.generators.generator1.owned.toNumber()).toBe(0);
    expect(mockPlayerState.generators.generator2.owned.toNumber()).toBe(0);
  });
});

describe("resetResources", () => {
  it("should reset all resources to zero", () => {
    const mockPlayerState = {
      resources: {
        energy: new Decimal(10),
        matter: new Decimal(5),
      },
    } as unknown as PlayerState;

    resetResources(mockPlayerState);

    expect(mockPlayerState.resources.energy.toNumber()).toBe(0);
    expect(mockPlayerState.resources.matter.toNumber()).toBe(0);
  });
});

describe("resetUpgrades", () => {
  it("should reset all upgrades to zero", () => {
    const mockPlayerState = {
      upgrades: {
        upgrade1: { owned: new Decimal(10) },
        upgrade2: { owned: new Decimal(5) },
      },
    } as unknown as PlayerState;

    resetUpgrades(mockPlayerState);

    expect(mockPlayerState.upgrades.upgrade1.owned.toNumber()).toBe(0);
    expect(mockPlayerState.upgrades.upgrade2.owned.toNumber()).toBe(0);
  });
});
