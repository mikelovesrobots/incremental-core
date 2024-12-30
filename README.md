# Incremental Core

A lightweight, flexible TypeScript library for building incremental games with support for generators, upgrades, dynamic costs, and prestige mechanics. This library separates game definitions from player state to provide clarity and extensibility for developers.

## Features

- **Generators**: Create resources over time with customizable costs and scaling.
- **Upgrades**: Enhance generators with multipliers, adders, or custom effects.
- **Prestige**: Reset the game state while granting permanent bonuses to keep players engaged.
- **Unlock Conditions**: Hide generators and upgrades until specific criteria are met.
- **Data-Driven**: Define all game logic in JSON structures for easy customization.
- **Player State**: Including saving and loading

## Does not include:

- Front-end of any sort. This is an engine you build your game on top of.

## Installation

```bash
npm install incremental-core
```

## Quick Start

### Define Generators and Upgrades

Create static definitions for generators and upgrades in your game. These define the behaviors and rules for your game components.

Example: Generators

```typescript
// generators.ts
import type { GeneratorDefinition } from "incremental-core";

export const generatorDefinitions: GeneratorDefinition[] = [
  {
    id: "solarPanel",
    name: "Solar Panel",
    baseProduction: 1,
    resource: "energy",
    cost: { base: 10, scaling: 1.15 },
    unlockCondition: (state) => true, // Always unlocked
  },
  {
    id: "fusionReactor",
    name: "Fusion Reactor",
    baseProduction: 10,
    resource: "energy",
    cost: { base: 1000, scaling: 1.25 },
    unlockCondition: (state) =>
      state.generators.solarPanel && state.generators.solarPanel.owned >= 10,
  },
];
```

Example: Upgrades

```typescript
// upgrades.ts
import type { UpgradeDefinition } from "incremental-core";

export const upgradeDefinitions: UpgradeDefinition[] = [
  {
    id: "solarPanelEfficiency",
    name: "Solar Panel Efficiency",
    generatorId: "solarPanel",
    effects: [
      {
        type: "multiply",
        resource: "energy",
        value: 2,
        stackingBehavior: "multiplicative",
      },
    ],
    cost: { base: 50, scaling: 1.2 },
    unlockCondition: (state) =>
      state.generators.solarPanel && state.generators.solarPanel.owned >= 5,
  },
];
```

### Initialize Player State

Set up the player's mutable state, which tracks their progress in the game. This state can be easily serialized for saving and loading.

```typescript
// playerState.ts
import type { PlayerState } from "incremental-core";

export const playerState: PlayerState = {
  resources: { energy: 0 },
  generators: {
    solarPanel: { owned: 0 },
    fusionReactor: { owned: 0 },
  },
  upgrades: {
    solarPanelEfficiency: { stackCount: 0 },
  },
  prestigePoints: 0,
  prestigeBonuses: { productionMultiplier: 1.1 },
};
```

## Add Game Logic

Use the library's helper methods to implement game mechanics like calculating costs, production, and prestige.

### Calculate Costs

```typescript
import { calculateCost, findGeneratorById } from "incremental-core";

const nextPurchaseCost = calculateCost(
  generatorDefinitions,
  playerState,
  "solarPanel"
);

console.log(`Cost of next Solar Panel: ${nextPurchaseCost}`);
```

### Calculate Production

```typescript
import { calculateProduction } from "incremental-core";

const production = calculateProduction(
  solarPanel,
  playerState,
  upgradeDefinitions
);

console.log(`Solar Panel Production: ${production}`);
```

### Unlock Conditions

```typescript
import { findVisibleGenerators, findVisibleUpgrades } from "incremental-core";

const visibleGenerators = findVisibleGenerators(
  playerState,
  generatorDefinitions
);
const visibleUpgrades = findVisibleUpgrades(playerState, upgradeDefinitions);

console.log("Visible Generators:", visibleGenerators);
console.log("Visible Upgrades:", visibleUpgrades);
```

### Prestige

```typescript
import { prestige } from "incremental-core";

prestige(playerState);

console.log(`Prestige Points: ${playerState.prestigePoints}`);
```

### Purchase Generator

```typescript
purchaseGenerator("solarPanel", playerState, generatorDefinitions);
```

### Saving and Loading State

#### Save State

```typescript
const saveState = JSON.stringify(playerState);
localStorage.setItem("gameSave", saveState);
```

#### Load State

```typescript
const loadedState = JSON.parse(localStorage.getItem("gameSave") || "{}");
Object.assign(playerState, loadedState);
```

## Example Game Loop

Set up a basic loop that processes ticks, updates player state, and displays progress.

```typescript
import {
  calculateProduction,
  updateVisibility,
  purchaseGenerator,
} from "incremental-core";
import { generatorDefinitions, upgradeDefinitions } from "./gameDefinitions";
import { playerState } from "./playerState";

function gameTick() {
  // Calculate resource gains
  generatorDefinitions.forEach((generator) => {
    if (playerState.generators[generator.id]?.owned > 0) {
      const production = calculateProduction(
        generator,
        playerState,
        upgradeDefinitions
      );
      playerState.resources[generator.resource] += production;
    }
  });

  console.log("Player State:", playerState);
}

// Run a tick every second
setInterval(gameTick, 1000);

// Example purchase action
purchaseGenerator("solarPanel", playerState, generatorDefinitions);
```

## Contributing

We welcome contributions! Please submit pull requests on GitHub.

## License

Licensed under the MIT License.
