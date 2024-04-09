import { expect, test, describe, vi } from "vitest";
import Player from "../packages/server/game/Player";

describe("Player", () => {
  test("Création d'un joueur avec un socket client", () => {
    // Créez un socket client factice pour les tests
    const mockSocket = vi.fn();
    // Créez un joueur avec le socket client factice
    const player = new Player("testPlayer", mockSocket);

    // Vérifiez si le joueur a été créé correctement avec le socket client
    expect(player.name).toBe("testPlayer");
    expect(player.socket).toBe(mockSocket);
  });
});
