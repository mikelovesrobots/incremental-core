import { getGeneratorCost, getUpgradeCost } from "./calculateCosts";
import * as indexModule from "@/index";
import Decimal from "decimal.js";
import { GeneratorDefinition, PlayerState, UpgradeDefinition } from "@/types";

// Mock the imported functions
jest.mock("@/index", () => ({
  getOwnedGeneratorsCount: jest.fn(),
  getOwnedUpgradesCount: jest.fn(),
}));

describe("calculateCosts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getGeneratorCost", () => {
    const mockGenerator: GeneratorDefinition = {
      id: "generator1",
      cost: {
        base: new Decimal(10),
        scaling: new Decimal(1.15),
      },
    } as unknown as GeneratorDefinition;

    const mockPlayerState: PlayerState = {
      generators: {
        generator1: new Decimal(2),
      },
      upgrades: {},
    } as unknown as PlayerState;

    it("should calculate correct cost for owned generators", () => {
      // Setup mock return value
      jest
        .spyOn(indexModule, "getOwnedGeneratorsCount")
        .mockReturnValue(new Decimal(2));

      const cost = getGeneratorCost(mockGenerator, mockPlayerState);

      // Verify mock was called with correct arguments
      expect(indexModule.getOwnedGeneratorsCount).toHaveBeenCalledWith(
        mockPlayerState,
        mockGenerator.id
      );

      // Verify calculation
      const expectedCost = new Decimal(10).mul(new Decimal(1.15).pow(2));
      expect(cost.equals(expectedCost)).toBe(true);
    });

    it("should calculate base cost when none owned", () => {
      // Setup mock return value
      jest
        .spyOn(indexModule, "getOwnedGeneratorsCount")
        .mockReturnValue(new Decimal(0));

      const cost = getGeneratorCost(mockGenerator, mockPlayerState);

      expect(indexModule.getOwnedGeneratorsCount).toHaveBeenCalledWith(
        mockPlayerState,
        mockGenerator.id
      );
      expect(cost.equals(new Decimal(10))).toBe(true);
    });
  });

  describe("getUpgradeCost", () => {
    const mockUpgrade: UpgradeDefinition = {
      id: "upgrade1",
      cost: {
        base: new Decimal(100),
        scaling: new Decimal(2),
      },
    } as unknown as UpgradeDefinition;

    const mockPlayerState: PlayerState = {
      upgrades: {
        upgrade1: new Decimal(1),
      },
      generators: {},
    } as unknown as PlayerState;

    it("should calculate correct cost for owned upgrades", () => {
      // Setup mock return value
      jest
        .spyOn(indexModule, "getOwnedUpgradesCount")
        .mockReturnValue(new Decimal(1));

      const cost = getUpgradeCost(mockUpgrade, mockPlayerState);

      // Verify mock was called with correct arguments
      expect(indexModule.getOwnedUpgradesCount).toHaveBeenCalledWith(
        mockPlayerState,
        mockUpgrade.id
      );

      // Verify calculation
      const expectedCost = new Decimal(100).mul(new Decimal(2).pow(1));
      expect(cost.equals(expectedCost)).toBe(true);
    });

    it("should calculate base cost when none owned", () => {
      // Setup mock return value
      jest
        .spyOn(indexModule, "getOwnedUpgradesCount")
        .mockReturnValue(new Decimal(0));

      const cost = getUpgradeCost(mockUpgrade, mockPlayerState);

      expect(indexModule.getOwnedUpgradesCount).toHaveBeenCalledWith(
        mockPlayerState,
        mockUpgrade.id
      );
      expect(cost.equals(new Decimal(100))).toBe(true);
    });
  });
});
