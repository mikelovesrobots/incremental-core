import Decimal from "decimal.js";
import { canPrestige, prestige } from "@/data/prestige";
import {
  applyPrestigeBonus,
  resetGenerators,
  resetResources,
  resetUpgrades,
} from "@/index";
import type { PrestigeDefinition, PlayerState } from "@/types";

jest.mock("@/index", () => ({
  applyPrestigeBonus: jest.fn(),
  resetResources: jest.fn(),
  resetGenerators: jest.fn(),
  resetUpgrades: jest.fn(),
}));

describe("prestige", () => {
  let mockPlayerState: PlayerState;
  let mockPrestigeDefinition: PrestigeDefinition;

  beforeEach(() => {
    mockPlayerState = {
      prestigeBonuses: { productionMultiplier: new Decimal(1) },
      generators: { generator1: { owned: new Decimal(10) } },
      resources: { resource1: new Decimal(100) },
      upgrades: { upgrade1: { owned: new Decimal(5) } },
    } as unknown as PlayerState;

    mockPrestigeDefinition = {
      unlockCondition: jest.fn().mockReturnValue(true),
      bonused: {
        productionMultiplier: jest.fn().mockReturnValue(new Decimal(2)),
      },
    } as unknown as PrestigeDefinition;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("canPrestige returns true when unlockCondition is met", () => {
    expect(canPrestige(mockPrestigeDefinition, mockPlayerState)).toBe(true);
  });

  test("canPrestige returns false when unlockCondition is not met", () => {
    (mockPrestigeDefinition.unlockCondition as jest.Mock).mockReturnValue(
      false
    );
    expect(canPrestige(mockPrestigeDefinition, mockPlayerState)).toBe(false);
  });

  test("prestige returns false when unlockCondition is not met", () => {
    (mockPrestigeDefinition.unlockCondition as jest.Mock).mockReturnValue(
      false
    );
    expect(prestige(mockPrestigeDefinition, mockPlayerState)).toBe(false);
  });

  test("prestige applies prestige bonus and resets state when unlockCondition is met", () => {
    expect(prestige(mockPrestigeDefinition, mockPlayerState)).toBe(true);
    expect(applyPrestigeBonus).toHaveBeenCalledWith(
      mockPrestigeDefinition,
      mockPlayerState
    );
    expect(resetResources).toHaveBeenCalledWith(mockPlayerState);
    expect(resetGenerators).toHaveBeenCalledWith(mockPlayerState);
    expect(resetUpgrades).toHaveBeenCalledWith(mockPlayerState);
  });
});
