import Decimal from "decimal.js";
import { PlayerState, UpgradeDefinition } from "../../src/index.d";
import { findUpgradeById, findVisibleUpgrades } from "../../src";

describe("findVisibleUpgrades", () => {
  const mockUpgrades: Partial<UpgradeDefinition>[] = [
    {
      id: "upgrade1",
      unlockCondition: jest.fn((state: PlayerState) =>
        state.resources.energy.greaterThan(0)
      ),
    },
    {
      id: "upgrade2",
      unlockCondition: jest.fn((state: PlayerState) =>
        state.resources.energy.greaterThan(10)
      ),
    },
  ];

  const mockPlayerState: Partial<PlayerState> = {
    resources: { energy: new Decimal(5) },
  };

  it("should return upgrades that are unlocked", () => {
    const visibleUpgrades = findVisibleUpgrades(
      mockUpgrades as UpgradeDefinition[],
      mockPlayerState as PlayerState
    );
    expect(visibleUpgrades).toHaveLength(1);
    expect(visibleUpgrades[0].id).toBe("upgrade1");
  });

  it("should return an empty array if no upgrades are unlocked", () => {
    const playerState: Partial<PlayerState> = {
      ...mockPlayerState,
      resources: { energy: new Decimal(0) },
    };
    const visibleUpgrades = findVisibleUpgrades(
      mockUpgrades as UpgradeDefinition[],
      playerState as PlayerState
    );
    expect(visibleUpgrades).toHaveLength(0);
  });
});

describe("findUpgradeById", () => {
  const mockUpgrades: Partial<UpgradeDefinition>[] = [
    { id: "upgrade1" },
    { id: "upgrade2" },
  ];

  it("should return the upgrade with the specified id", () => {
    const upgrade = findUpgradeById(
      mockUpgrades as UpgradeDefinition[],
      "upgrade1"
    );
    expect(upgrade).toBeDefined();
    expect(upgrade?.id).toBe("upgrade1");
  });

  it("should return undefined if no upgrade with the specified id exists", () => {
    const upgrade = findUpgradeById(
      mockUpgrades as UpgradeDefinition[],
      "nonExistentUpgrade"
    );
    expect(upgrade).toBeUndefined();
  });
});
