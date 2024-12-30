import type { GeneratorDefinition, PlayerState } from "@/types";

export const findVisibleGenerators = (
  generatorDefinitions: GeneratorDefinition[],
  playerState: PlayerState
): GeneratorDefinition[] =>
  generatorDefinitions.filter((generatorDefinition) =>
    generatorDefinition.unlockCondition(playerState)
  );

export const findGeneratorById = (
  generatorDefinitions: GeneratorDefinition[],
  id: string
) =>
  generatorDefinitions.find(
    (generatorDefinition) => generatorDefinition.id == id
  );
