import Piece, { TetrisTile } from "./Piece";
import Position from "./Position";

class PieceList {

    private _list: Piece[]

    constructor() {
            this._list = []


            for (let index = 0; index < 50; index++) {
                const piece = new Piece(Math.floor(Math.random() * 100) % 7, new Position(4, 0))

                this._list.push(piece)
            }
    }

    public get(number: number): Piece {

        if (number >= this._list.length) {
            const piece = new Piece(Math.floor(Math.random() * 100) % 7, new Position(4, 0))

            this._list.push(piece)
        }

        return this._list[number].clone();
    }

}


export default PieceList