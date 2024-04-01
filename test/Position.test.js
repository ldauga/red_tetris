import { describe, expect, it, test } from "vitest";
import Position from "../packages/server/game/Position";

describe('Position', () => {
    test("Create Position", () => {
      const position = new Position(5, 6);
      expect(position.x).toBe(5);
      expect(position.y).toBe(6);
    });
});