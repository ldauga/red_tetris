"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Piece_1 = __importDefault(require("./Piece"));
const Position_1 = __importDefault(require("./Position"));
class PieceList {
    constructor() {
        this._list = [];
        for (let index = 0; index < 50; index++) {
            const piece = new Piece_1.default(Math.floor(Math.random() * 100) % 7, new Position_1.default(4, 0));
            this._list.push(piece);
        }
    }
    get(number) {
        if (number >= this._list.length) {
            const piece = new Piece_1.default(Math.floor(Math.random() * 100) % 7, new Position_1.default(4, 0));
            this._list.push(piece);
        }
        return this._list[number].clone();
    }
    reset() {
        for (let index = 0; index < this._list.length; index++) {
            delete this._list[index];
        }
        this._list.splice(0, this._list.length);
        for (let index = 0; index < 50; index++) {
            const piece = new Piece_1.default(Math.floor(Math.random() * 100) % 7, new Position_1.default(4, 0));
            this._list.push(piece);
        }
    }
}
exports.default = PieceList;
