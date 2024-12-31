import { calculateProduction } from "@/data/calculateProduction";
import { UpgradeDefinition, GeneratorDefinition, PlayerState } from "@/types";
import Decimal from "decimal.js";

describe("calculateProduction", () => {
  // Basic test setup
  const mockGenerator = {
    id: "generator1",
    baseProduction: new Decimal(10),
  } as unknown as GeneratorDefinition;

  const mockPlayerState = {
    generators: {
      generator1: {
        owned: new Decimal(1),
      },
    },
    upgrades: {},
    prestigeBonuses: {
      productionMultiplier: new Decimal(1),
    },
  } as unknown as PlayerState;

  const mockUpgrades: UpgradeDefinition[] = [];

  it("calculates base production without upgrades", () => {
    const result = calculateProduction(
      mockGenerator,
      mockPlayerState,
      mockUpgrades
    );
    expect(result).toEqualDecimal(10);
  });

  it("scales with number of owned generators", () => {
    const playerState = {
      ...mockPlayerState,
      generators: {
        generator1: {
          owned: new Decimal(3),
        },
      },
    } as unknown as PlayerState;

    const result = calculateProduction(
      mockGenerator,
      playerState,
      mockUpgrades
    );
    expect(result).toEqualDecimal(30);
  });

  it("applies upgrade multipliers correctly", () => {
    const upgrades = [
      {
        id: "upgrade1",
        generatorId: "generator1",
        effects: [
          {
            type: "multiply",
            value: new Decimal(2),
          },
        ],
      },
    ] as unknown as UpgradeDefinition[];

    const playerState = {
      ...mockPlayerState,
      upgrades: {
        upgrade1: {
          owned: new Decimal(1),
        },
      },
    } as unknown as PlayerState;

    const result = calculateProduction(mockGenerator, playerState, upgrades);
    expect(result).toEqualDecimal(20);
  });

  it("applies prestige bonus correctly", () => {
    const playerState = {
      ...mockPlayerState,
      prestigeBonuses: {
        productionMultiplier: new Decimal(2),
      },
    } as unknown as PlayerState;

    const result = calculateProduction(
      mockGenerator,
      playerState,
      mockUpgrades
    );
    expect(result).toEqualDecimal(20);
  });

  it("combines upgrades and prestige multipliers", () => {
    const upgrades = [
      {
        id: "upgrade1",
        generatorId: "generator1",
        effects: [
          {
            type: "multiply",
            value: new Decimal(2),
          },
        ],
      },
    ] as unknown as UpgradeDefinition[];

    const playerState = {
      ...mockPlayerState,
      upgrades: {
        upgrade1: {
          owned: new Decimal(1),
        },
      },
      prestigeBonuses: {
        productionMultiplier: new Decimal(2),
      },
    } as unknown as PlayerState;

    const result = calculateProduction(mockGenerator, playerState, upgrades);
    expect(result).toEqualDecimal(40);
  });

  it("ignores upgrades for other generators", () => {
    const upgrades = [
      {
        id: "upgrade1",
        generatorId: "generator2", // Different generator
        effects: [
          {
            type: "multiply",
            value: new Decimal(2),
          },
        ],
      },
    ] as unknown as UpgradeDefinition[];

    const playerState = {
      ...mockPlayerState,
      upgrades: {
        upgrade1: {
          owned: new Decimal(1),
        },
      },
    } as unknown as PlayerState;

    const result = calculateProduction(mockGenerator, playerState, upgrades);
    expect(result).toEqualDecimal(10);
  });
});
