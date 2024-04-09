import { describe, test, expect } from "vitest";
import PieceList from "../packages/server/game/PieceList";


describe('PieceList', () => {
    test('Création PieceList', () => {
        const pieceList = new PieceList()
        const piece = pieceList._list[0].color
        expect(piece).toStrictEqual(pieceList.get(0).color);
    });
    test('Get piece if argument number is bigger that array PieceList', () => {
        const pieceList = new PieceList();
        const piece = pieceList.get(50).color
        expect(piece).toStrictEqual(pieceList._list[50].color);
    })
    test('Reset', () => {
        const pieceList = new PieceList();
        pieceList.reset()
        expect(pieceList._list.length).toBe(50);
    })
});
