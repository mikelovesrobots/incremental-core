import Decimal from "decimal.js";
import {
  applyPrestigeBonus,
  getOwnedGeneratorsCount,
  getOwnedUpgradesCount,
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

describe("state utilities", () => {
  let mockPlayerState: PlayerState;

  beforeEach(() => {
    mockPlayerState = {
      generators: {
        generator1: { owned: new Decimal(5) },
        generator2: { owned: new Decimal(0) },
      },
      upgrades: {
        upgrade1: { owned: new Decimal(3) },
        upgrade2: { owned: new Decimal(0) },
      },
    } as unknown as PlayerState;
  });

  describe("getOwnedGeneratorsCount", () => {
    it("should return correct number of owned generators", () => {
      const count = getOwnedGeneratorsCount(mockPlayerState, "generator1");
      expect(count).toEqualDecimal(5);
    });

    it("should return zero for generators with no purchases", () => {
      const count = getOwnedGeneratorsCount(mockPlayerState, "generator2");
      expect(count).toEqualDecimal(0);
    });

    it("should return zero for non-existent generators", () => {
      const count = getOwnedGeneratorsCount(mockPlayerState, "nonexistent");
      expect(count).toEqualDecimal(0);
    });
  });

  describe("getOwnedUpgradesCount", () => {
    it("should return correct number of owned upgrades", () => {
      const count = getOwnedUpgradesCount(mockPlayerState, "upgrade1");
      expect(count).toEqualDecimal(3);
    });

    it("should return zero for upgrades with no purchases", () => {
      const count = getOwnedUpgradesCount(mockPlayerState, "upgrade2");
      expect(count).toEqualDecimal(0);
    });

    it("should return zero for non-existent upgrades", () => {
      const count = getOwnedUpgradesCount(mockPlayerState, "nonexistent");
      expect(count).toEqualDecimal(0);
    });
  });
});
