import { findGeneratorById, findVisibleGenerators } from "@/index";
import type { GeneratorDefinition, PlayerState } from "@/types";
import Decimal from "decimal.js";

describe("findVisibleGenerators", () => {
  const mockGenerators: Partial<GeneratorDefinition>[] = [
    {
      id: "solarPanel",
      unlockCondition: jest.fn((state: PlayerState) =>
        state.resources.energy.greaterThan(0)
      ),
    },
    {
      id: "windTurbine",
      unlockCondition: jest.fn((state: PlayerState) =>
        state.resources.energy.greaterThan(10)
      ),
    },
  ];

  const mockPlayerState: Partial<PlayerState> = {
    resources: { energy: new Decimal(5) },
  };

  it("should return generators that are unlocked", () => {
    const visibleGenerators = findVisibleGenerators(
      mockGenerators as GeneratorDefinition[],
      mockPlayerState as PlayerState
    );
    expect(visibleGenerators).toHaveLength(1);
    expect(visibleGenerators[0].id).toBe("solarPanel");
  });

  it("should return an empty array if no generators are unlocked", () => {
    const playerState: Partial<PlayerState> = {
      ...mockPlayerState,
      resources: { energy: new Decimal(0) },
    };
    const visibleGenerators = findVisibleGenerators(
      mockGenerators as GeneratorDefinition[],
      playerState as PlayerState
    );
    expect(visibleGenerators).toHaveLength(0);
  });
});

describe("findGeneratorById", () => {
  const mockGenerators: Partial<GeneratorDefinition>[] = [
    { id: "solarPanel" },
    { id: "windTurbine" },
  ];

  it("should return the generator with the specified id", () => {
    const generator = findGeneratorById(
      mockGenerators as GeneratorDefinition[],
      "solarPanel"
    );
    expect(generator).toBeDefined();
    expect(generator?.id).toBe("solarPanel");
  });

  it("should return undefined if no generator with the specified id exists", () => {
    const generator = findGeneratorById(
      mockGenerators as GeneratorDefinition[],
      "nonExistentGenerator"
    );
    expect(generator).toBeUndefined();
  });
});
