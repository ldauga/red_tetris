import { describe, expect, vi, test } from "vitest";
import Game from "../packages/server/game/Game.ts";
import Piece from "../packages/server/game/Piece.ts";
import Player from "../packages/server/game/Player.ts";
import Position from "../packages/server/game/Position.ts";
import PieceList from "../packages/server/game/PieceList.ts";

describe("Game", () => {
  test("Create Game", () => {
    const mockSocket = vi.fn();
    const player = new Player("testPlayer", mockSocket);
    const position = new Position(5, 6);
    const next_piece = new Piece(0, position);
    const currentPiece = new Piece(2, position);
    const game = new Game(currentPiece, next_piece, player);

    expect(game._score).toBe(0);
  });

  describe("Game getters", () => {
    const mockSocket = vi.fn();
    const player = new Player("Alex", mockSocket);
    const position = new Position(0, 0);
    const next_piece = new Piece(1, position);
    const currentPiece = new Piece(3, position);
    const game = new Game(currentPiece, next_piece, player);

    test("get player", () => {
      const myPlayer = game.player;
      expect(myPlayer).toBe(player);
    });

    test("get grid", () => {
      const myGrid = game.grid;
      expect(myGrid).toStrictEqual([
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      ]);
    });

    test("get is_finish", () => {
      const is_finish = game.is_finish;
      expect(is_finish).toBe(false);
    });

    test("get next_piece", () => {
      const myNextPiece = game.next_piece;
      expect(myNextPiece).toBe(next_piece);
    });

    test("get score", () => {
      const score = game.score;
      expect(score).toBe(0);
    });
  });

  describe("Private fonctions", () => {
    const mockSocket = vi.fn();
    const player = new Player("Léo", mockSocket);
    const position = new Position(0, 0);
    const next_piece = new Piece(2, position);
    const currentPiece = new Piece(4, position);
    const game = new Game(currentPiece, next_piece, player);

    test("isCurrentTouch", () => {
      const _isCurrentTouch = game._isCurrentTouch();

      expect(_isCurrentTouch).toBe(false);
    });

    test("isCurrentTouch true", () => {
      const testmockSocket = {
        emit: vi.fn(() => 1),
      };
      const testplayer = new Player("Alex", testmockSocket);
      const testposition = new Position(0, 0);
      const testposition2 = new Position(0, 0);
      const pieceList = new PieceList();
      const testnext_piece = new Piece(1, testposition);
      const testcurrentPiece = new Piece(1, testposition2);
      const testgame = new Game(testcurrentPiece, testnext_piece, testplayer);

      testgame.start(testcurrentPiece, testnext_piece);
      testgame.drop();
      const _isCurrentTouch = testgame._isCurrentTouch();
      expect(_isCurrentTouch).toBe(true);

      testgame.update(pieceList, testgame);
      testgame.drop();
      const _isCurrentTouch2 = testgame._isCurrentTouch();
      expect(_isCurrentTouch2).toBe(true);
    });

    test("_isCurrentTouchRight", () => {
      const _isCurrentTouchRight = game._isCurrentTouchRight();
      expect(_isCurrentTouchRight).toBe(false);
    });

    test("_isCurrentTouchRight true", () => {
      const testmockSocket = {
        emit: vi.fn(() => 1),
      };
      const testplayer = new Player("Alex", testmockSocket);
      const testposition = new Position(9, 0);
      const testposition2 = new Position(8, 0);
      const pieceList = new PieceList();
      const testcurrentPiece = new Piece(0, testposition);
      const testnext_piece = new Piece(0, testposition2);
      const testgame = new Game(testcurrentPiece, testnext_piece, testplayer);

      testgame.start(testcurrentPiece, testnext_piece);

      const _isCurrentTouchRight = testgame._isCurrentTouchRight();

      expect(_isCurrentTouchRight).toBe(true);

      testgame.drop();
      testgame.update(pieceList, testgame);
      testgame.drop();

      const _isCurrentTouchRight2 = testgame._isCurrentTouchRight();
      expect(_isCurrentTouchRight2).toBe(true);
    });

    test("_isCurrentTouchLeft", () => {
      const _isCurrentTouchLeft = game._isCurrentTouchLeft();
      expect(_isCurrentTouchLeft).toBe(false);
    });

    test("_isCurrentTouchLeft true", () => {
      const testmockSocket = {
        emit: vi.fn(() => 1),
      };
      const testplayer = new Player("Alex", testmockSocket);
      const testposition = new Position(0, 0);
      const testposition2 = new Position(1, 0);
      const pieceList = new PieceList();
      const testcurrentPiece = new Piece(0, testposition);
      const testnext_piece = new Piece(0, testposition2);
      const testgame = new Game(testcurrentPiece, testnext_piece, testplayer);

      testgame.start(testcurrentPiece, testnext_piece);

      const _isCurrentTouchLeft = testgame._isCurrentTouchLeft();

      expect(_isCurrentTouchLeft).toBe(true);

      testgame.drop();
      testgame.update(pieceList, testgame);
      testgame.drop();

      const _isCurrentTouchLeft2 = testgame._isCurrentTouchLeft();
      expect(_isCurrentTouchLeft2).toBe(true);
    });

    test("_cleanBoardCurrentPiece", () => {
      game._cleanBoardCurrentPiece();
      expect(game.grid[0][0]).toBe("0");
    });

    test("_displayCurrentPiece", () => {
      game._displayCurrentPiece();
      expect(game.grid[0][1]).toBe("C");
    });

    test("_isLineFull", () => {
      const _isLineFull = game._isLineFull();
      expect(_isLineFull).toBe(-1);
    });
  
  });

  describe("Moves fonctions", () => {
    const mockSocket = vi.fn();
    const player = new Player("Léo", mockSocket);
    const position = new Position(5, 0);
    const next_piece = new Piece(2, position);
    const currentPiece = new Piece(4, position);
    const game = new Game(currentPiece, next_piece, player);

    test("moveDown", () => {
      game.moveDown();
      expect(game._current_piece.position.y).toBe(1);
    });

    test("moveRight", () => {
      game.moveRight();
      expect(game._current_piece.position.x).toBe(6);
    });

    test("moveLeft", () => {
      game.moveLeft();
      expect(game._current_piece.position.x).toBe(5);
    });

    test("drop", () => {
      game.drop();
      expect(game._current_piece.position.y).toBe(18);
    });

    describe("rotate", () => {
      const position = new Position(5, 0);
      const next_piece = new Piece(2, position);
      const currentPiece = new Piece(4, position);
      const game = new Game(currentPiece, next_piece, player);

      test("rotate piece", () => {
        game.rotate();
        expect(game._current_piece.rotation_shape).toBe(
          currentPiece.rotation_shape
        );
      });

      test("cannot rotate bottom", () => {
        game.drop();
        game.rotate();
        expect(game._current_piece.rotation_shape).toBe(
          currentPiece.rotation_shape
        );
      });
    });
  });

  describe("Other fonctions", () => {
    const mockSocket = vi.fn();
    const player = new Player("Léo", mockSocket);

    test("start", () => {
      const position = new Position(5, 0);
      const next_piece = new Piece(2, position);
      const currentPiece = new Piece(4, position);
      const game = new Game(currentPiece, next_piece, player);

      game.start(currentPiece, next_piece);
      expect(game.grid[0][0]).toBe("0");
    });

    test("add_line", () => {
      const mockSocketZ = vi.fn();
      const playerZ = new Player("Léo", mockSocketZ);
      const position = new Position(5, 9);
      const next_piece = new Piece(2, position);
      const currentPiece = new Piece(4, position);
      const game = new Game(currentPiece, next_piece, playerZ);

      game.start(currentPiece, next_piece);
      game.add_line(1);
      expect(currentPiece.position.y).toBe(8);
    });

    describe("update", () => {
      test("update base", () => {
        const position = new Position(5, 0);
        const next_piece = new Piece(2, position);
        const currentPiece = new Piece(4, position);
        const game = new Game(currentPiece, next_piece, player);

        game.update();
        expect(game._current_piece.position.y).toBe(1);
      });
      test("Big update", () => {
        const testmockSocket = {
          emit: vi.fn(() => 1),
        };
        const Testplayer = new Player("Alex", testmockSocket);
        const Testposition = new Position(5, 0);
        const Testnext_piece = new Piece(2, Testposition);
        const TestcurrentPiece = new Piece(4, Testposition);
        const Testgame = new Game(TestcurrentPiece, Testnext_piece, Testplayer);

        const pieceList = new PieceList();
        const OthermockSocket = {
          emit: vi.fn(() => 1),
        };
        const Otherplayer = new Player("Alex", OthermockSocket);
        const Otherposition = new Position(5, 0);
        const Othernext_piece = new Piece(2, Otherposition);
        const OthercurrentPiece = new Piece(4, Otherposition);
        const Othergame = new Game(
          OthercurrentPiece,
          Othernext_piece,
          Otherplayer
        );

        Testgame.start(TestcurrentPiece, Testnext_piece);
        Testgame.drop();
        Testgame.update(pieceList, Othergame);
        expect(Testgame._current_piece.position.y).toBe(18);
      });
    });
  });
});
