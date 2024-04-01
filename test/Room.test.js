import { describe, expect, test, vi } from "vitest";
import Room from "../packages/server/game/Room.ts";
import Player from "../packages/server/game/Player.ts";

describe("Room", () => {
  test("Create Room", () => {
    const mockSocket = {
      emit: vi.fn(() => 1),
    };

    const player = new Player("Alex", mockSocket);
    const room = new Room("myRoom", player);
    expect(room.name).toBe("myRoom");
  });
  describe("Getter fonctions", () => {
    const mockSocket = {
      emit: vi.fn(() => 1),
    };

    const player = new Player("Alex", mockSocket);
    const room = new Room("myRoom", player);
    test("Main player", () => {
      expect(room.main_player).toBe(player);
    });
    test("Length_game", () => {
      expect(room.length_game).toBe(1);
    });
    test("Is running", () => {
      expect(room.is_running).toBe(false);
    });
  });
  describe("Utils fonctions", () => {
    const mockSocket = {
      emit: vi.fn(() => 1),
    };

    const player = new Player("Alex", mockSocket);
    const room = new Room("myRoom", player);
    test("Add player", () => {
      const newPlayer = new Player("Léo", mockSocket);
      room.addPlayer(newPlayer);

      expect(room.length_game).toBe(2);
    });
    test("Remove player", () => {
      room.removePlayer("Alex");
      expect(room.length_game).toBe(1);
    });
    test("Get user game", () => {
      expect(room.getUserGame("Léos")).toBe(null);
      expect(room.getUserGame("Léo")).toBe(room._games[0]);
    });
  });
  describe("Other fonctions", () => {
    const mockSocket = {
      emit: vi.fn(() => 1),
    };

    const player = new Player("Alex", mockSocket);
    const room = new Room("myRoom", player);

    test("Start", () => {
      room.start();
      expect(room.is_running).toBe(true);
      const otherPlayer = new Player("Francis", mockSocket);

      room.addPlayer(otherPlayer);
      room.removePlayer("Francis");
    });
    test("emit", () => {
      room.emit();
      expect(mockSocket.emit).toHaveBeenCalledTimes(4);
    });
    test("update", () => {
      const mockSocket2 = {
        emit: vi.fn(() => 1),
      };

      const player2 = new Player("Alex", mockSocket2);
      const room2 = new Room("myRoom2", player2);
      const OtherPlayer = new Player("Léo", mockSocket2);
      room2.addPlayer(OtherPlayer);
      room2.update();
    });
  });
});
