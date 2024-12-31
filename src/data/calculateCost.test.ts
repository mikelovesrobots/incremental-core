import Decimal from "decimal.js";
import { calculateGeneratorCost, calculateUpgradeCost } from "@/index";
import { GeneratorDefinition, PlayerState, UpgradeDefinition } from "@/types";

describe("calculateCosts", () => {
  describe("calculateGeneratorCost", () => {
    it("should calculate correct cost for 0 owned generators", () => {
      const generator: GeneratorDefinition = {
        id: "generator1",
        cost: {
          base: new Decimal(10),
          scaling: new Decimal(1.15),
        },
      } as GeneratorDefinition;

      const playerState: PlayerState = {
        generators: {
          generator1: { owned: 0 },
        },
      } as unknown as PlayerState;

      const cost = calculateGeneratorCost(generator, playerState);
      expect(cost).toEqualDecimal(new Decimal(10));
    });

    it("should calculate correct cost for multiple owned generators", () => {
      const generator: GeneratorDefinition = {
        id: "generator1",
        cost: {
          base: new Decimal(10),
          scaling: new Decimal(1.15),
        },
      } as GeneratorDefinition;

      const playerState: PlayerState = {
        generators: {
          generator1: { owned: 2 },
        },
      } as unknown as PlayerState;

      const cost = calculateGeneratorCost(generator, playerState);
      // 10 * (1.15^2) ≈ 13.225
      expect(cost).toEqualDecimal(new Decimal("13.225"));
    });
  });

  describe("calculateUpgradeCost", () => {
    it("should calculate correct cost for 0 owned upgrades", () => {
      const upgrade: UpgradeDefinition = {
        id: "upgrade1",
        cost: {
          base: new Decimal(100),
          scaling: new Decimal(2),
        },
      } as UpgradeDefinition;

      const playerState: PlayerState = {
        upgrades: {
          upgrade1: { owned: 0 },
        },
      } as unknown as PlayerState;

      const cost = calculateUpgradeCost(upgrade, playerState);
      expect(cost).toEqualDecimal(new Decimal("100"));
    });

    it("should calculate correct cost for multiple owned upgrades", () => {
      const upgrade: UpgradeDefinition = {
        id: "upgrade1",
        cost: {
          base: new Decimal(100),
          scaling: new Decimal(2),
        },
      } as UpgradeDefinition;

      const playerState: PlayerState = {
        upgrades: {
          upgrade1: { owned: 3 },
        },
      } as unknown as PlayerState;

      const cost = calculateUpgradeCost(upgrade, playerState);
      // 100 * (2^3) = 800
      expect(cost).toEqualDecimal(new Decimal("800"));
    });
  });
});
