import { describe, expect, test } from "vitest";
import Position from "../packages/server/game/Position";
import Piece from "../packages/server/game/Piece";

describe("Piece", () => {
  describe("Création Piece", () => {
    describe("Création I Piece", () => {
      const position = new Position(5, 6);
      const piece = new Piece(0, position);
      const shape = [[[1], [1], [1], [1]], [[1, 1, 1, 1]]];

      test("I Piece color", () => {
        expect(piece.color).toBe("#F1A208");
      });

      test("I Piece shape", () => {
        expect(piece._shape).toStrictEqual(shape);
      });
    });
    describe("Création J Piece", () => {
      const position = new Position(5, 6);
      const piece = new Piece(1, position);
      const shape = [
        [
          [1, 1, 1],
          [0, 0, 1],
        ],
        [
          [0, 1],
          [0, 1],
          [1, 1],
        ],
        [
          [1, 0, 0],
          [1, 1, 1],
        ],
        [
          [1, 1],
          [1, 0],
          [1, 0],
        ],
      ];
      test("J Piece color", () => {
        expect(piece.color).toBe("#CBBAED");
      });

      test("J Piece shape", () => {
        expect(piece._shape).toStrictEqual(shape);
      });
    });
    describe("Création L Piece", () => {
      const position = new Position(5, 6);
      const piece = new Piece(2, position);
      const shape = [
        [
          [1, 1, 1],
          [1, 0, 0],
        ],
        [
          [1, 1],
          [0, 1],
          [0, 1],
        ],
        [
          [0, 0, 1],
          [1, 1, 1],
        ],
        [
          [1, 0],
          [1, 0],
          [1, 1],
        ],
      ];

      test("L Piece color", () => {
        expect(piece.color).toBe("#FB5012");
      });

      test("L Piece shape", () => {
        expect(piece._shape).toStrictEqual(shape);
      });
    });
    describe("Création O Piece", () => {
      const position = new Position(5, 6);
      const piece = new Piece(3, position);
      const shape = [
        [
          [1, 1],
          [1, 1],
        ],
      ];

      test("O Piece color", () => {
        expect(piece.color).toBe("#CBBAED");
      });

      test("O Piece shape", () => {
        expect(piece._shape).toStrictEqual(shape);
      });
    });
    describe("Création S Piece", () => {
      const position = new Position(5, 6);
      const piece = new Piece(4, position);
      const shape = [
        [
          [0, 1, 1],
          [1, 1, 0],
        ],
        [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
      ];

      test("S Piece color", () => {
        expect(piece.color).toBe("#03FCBA");
      });

      test("S Piece shape", () => {
        expect(piece._shape).toStrictEqual(shape);
      });
    });
    describe("Création T Piece", () => {
      const position = new Position(5, 6);
      const piece = new Piece(5, position);
      const shape = [
        [
          [1, 1, 1],
          [0, 1, 0],
        ],
        [
          [0, 1],
          [1, 1],
          [0, 1],
        ],
        [
          [0, 1, 0],
          [1, 1, 1],
        ],
        [
          [1, 0],
          [1, 1],
          [1, 0],
        ],
      ];

      test("T Piece color", () => {
        expect(piece.color).toBe("#1F363D");
      });

      test("T Piece shape", () => {
        expect(piece._shape).toStrictEqual(shape);
      });
    });
    describe("Création Z Piece", () => {
      const position = new Position(5, 6);
      const piece = new Piece(6, position);
      const shape = [
        [
          [1, 1, 0],
          [0, 1, 1],
        ],
        [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      ];

      test("Z Piece color", () => {
        expect(piece.color).toBe("#053C5E");
      });

      test("Z Piece shape", () => {
        expect(piece._shape).toStrictEqual(shape);
      });
    });
    describe("Création default Piece", () => {
      const position = new Position(5, 6);
      const piece = new Piece(8, position);
      const shape = [];

      test("Default Piece color", () => {
        expect(piece.color).toBe("#000000");
      });

      test("Default Piece shape", () => {
        expect(piece._shape).toStrictEqual(shape);
      });
    });
  });
  describe("Piece functions", () => {
    const position = new Position(5, 6);
    const piece = new Piece(0, position);
    const shape = [[[1], [1], [1], [1]], [[1, 1, 1, 1]]];

    test("shape", () => {
      const actualShape = piece.shape;
      expect(actualShape).toStrictEqual(shape[piece._rotation]);
    });
      test("rotation_shape", () => {
        const actualShape = piece.rotation_shape
        expect(actualShape).toStrictEqual(
          shape[(piece._rotation + 1) % shape.length]
        );
      });
    describe("piece_tag", () => {
      test("I_tag", () => {
        const pieceI = new Piece(0, position);
        const tag = pieceI.piece_tag;
        expect(tag).toBe("I");
      });
      test("J_tag", () => {
        const pieceJ = new Piece(1, position);
        const tag = pieceJ.piece_tag;
        expect(tag).toBe("J");
      });
      test("L_tag", () => {
        const pieceL = new Piece(2, position);
        const tag = pieceL.piece_tag;
        expect(tag).toBe("L");
      });
      test("O_tag", () => {
        const pieceO = new Piece(3, position);
        const tag = pieceO.piece_tag;
        expect(tag).toBe("O");
      });
      test("S_tag", () => {
        const pieceS = new Piece(4, position);
        const tag = pieceS.piece_tag;
        expect(tag).toBe("S");
      });
      test("T_tag", () => {
        const pieceT = new Piece(5, position);
        const tag = pieceT.piece_tag;
        expect(tag).toBe("T");
      });
      test("Z_tag", () => {
        const pieceZ = new Piece(6, position);
        const tag = pieceZ.piece_tag;
        expect(tag).toBe("Z");
      });
      test("Default_tag", () => {
        const pieceDefault = new Piece(8, position);
        const tag = pieceDefault.piece_tag;
        expect(tag).toBe("0");
      });
    });
    test("rotate", () => {
      piece.rotate();
      const newShape = piece.shape;
      expect(newShape).toStrictEqual(shape[piece._rotation]);
    });
    test("clone", () => {
      const pieceToClone = new Piece(5, position);
      const clone = pieceToClone.clone();
      expect(clone.shape).toStrictEqual(pieceToClone.shape);
    });
  });
});
