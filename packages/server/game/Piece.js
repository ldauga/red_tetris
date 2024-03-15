"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetrisTile = void 0;
const Position_1 = __importDefault(require("./Position"));
var TetrisTile;
(function (TetrisTile) {
    TetrisTile[TetrisTile["I_SHAPE"] = 0] = "I_SHAPE";
    TetrisTile[TetrisTile["J_SHAPE"] = 1] = "J_SHAPE";
    TetrisTile[TetrisTile["L_SHAPE"] = 2] = "L_SHAPE";
    TetrisTile[TetrisTile["O_SHAPE"] = 3] = "O_SHAPE";
    TetrisTile[TetrisTile["S_SHAPE"] = 4] = "S_SHAPE";
    TetrisTile[TetrisTile["T_SHAPE"] = 5] = "T_SHAPE";
    TetrisTile[TetrisTile["Z_SHAPE"] = 6] = "Z_SHAPE";
})(TetrisTile || (exports.TetrisTile = TetrisTile = {}));
class Piece {
    constructor(tile_type, position) {
        this._rotation = 0;
        this._type = tile_type;
        this.position = position;
        switch (tile_type) {
            case TetrisTile.I_SHAPE:
                this.color = '#F1A208';
                this._shape = [
                    [
                        [1],
                        [1],
                        [1],
                        [1],
                    ],
                    [
                        [1, 1, 1, 1],
                    ]
                ];
                break;
            case TetrisTile.J_SHAPE:
                this.color = '#CBBAED';
                this._shape = [
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
                    ]
                ];
                break;
            case TetrisTile.L_SHAPE:
                this.color = '#FB5012';
                this._shape = [
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
                    ]
                ];
                break;
            case TetrisTile.O_SHAPE:
                this.color = '#CBBAED';
                this._shape = [
                    [
                        [1, 1],
                        [1, 1]
                    ]
                ];
                break;
            case TetrisTile.S_SHAPE:
                this.color = '#03FCBA';
                this._shape = [
                    [
                        [0, 1, 1],
                        [1, 1, 0],
                    ],
                    [
                        [1, 0],
                        [1, 1],
                        [0, 1],
                    ]
                ];
                break;
            case TetrisTile.T_SHAPE:
                this.color = '#1F363D';
                this._shape = [
                    [
                        [1, 1, 1],
                        [0, 1, 0]
                    ],
                    [
                        [0, 1],
                        [1, 1],
                        [0, 1]
                    ],
                    [
                        [0, 1, 0],
                        [1, 1, 1]
                    ],
                    [
                        [1, 0],
                        [1, 1],
                        [1, 0]
                    ],
                ];
                break;
            case TetrisTile.Z_SHAPE:
                this.color = '#053C5E';
                this._shape = [
                    [
                        [1, 1, 0],
                        [0, 1, 1],
                    ],
                    [
                        [0, 1],
                        [1, 1],
                        [1, 0],
                    ]
                ];
                break;
            default:
                this.color = '#000000';
                this._shape = [];
                break;
        }
    }
    ////////////////////////////////////////////
    /////////        GETTER         ////////////
    ////////////////////////////////////////////
    get shape() {
        return this._shape[this._rotation];
    }
    get rotation_shape() {
        return this._shape[(this._rotation + 1) % this._shape.length];
    }
    get piece_tag() {
        switch (this._type) {
            case TetrisTile.I_SHAPE:
                return 'I';
            case TetrisTile.J_SHAPE:
                return 'J';
            case TetrisTile.L_SHAPE:
                return 'L';
            case TetrisTile.O_SHAPE:
                return 'O';
            case TetrisTile.S_SHAPE:
                return 'S';
            case TetrisTile.T_SHAPE:
                return 'T';
            case TetrisTile.Z_SHAPE:
                return 'Z';
            default:
                return '0';
        }
    }
    ////////////////////////////////////////////
    /////////         OTHER         ////////////
    ////////////////////////////////////////////
    rotate() {
        this._rotation = (this._rotation + 1) % this._shape.length;
    }
    clone() {
        return new Piece(this._type, new Position_1.default(this.position.x, this.position.y));
    }
}
exports.default = Piece;
