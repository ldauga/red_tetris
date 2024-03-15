import Position from "./Position";

export enum TetrisTile {
    I_SHAPE, 
    J_SHAPE,
    L_SHAPE,
    O_SHAPE,
    S_SHAPE,
    T_SHAPE,
    Z_SHAPE,
}

class Piece {
    private _rotation: number = 0
    private _shape: Array<Array<Array<number>>>;
    
    public color: string;

    public position: Position

    private _type: TetrisTile

    constructor(tile_type: TetrisTile, position: Position) {
        this._type = tile_type
        this.position = position
        switch (tile_type) {
            case TetrisTile.I_SHAPE:
                this.color = '#F1A208'
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
                ]



                break;
            case TetrisTile.J_SHAPE:
                this.color = '#CBBAED'
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
                ]
                break;
            case TetrisTile.L_SHAPE:
                this.color = '#FB5012'
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
                ]
                break;
            case TetrisTile.O_SHAPE:
                this.color = '#CBBAED'
                this._shape = [
                    [
                        [1, 1],
                        [1, 1]
                    ]
                ]
                break;
            case TetrisTile.S_SHAPE:
                this.color = '#03FCBA'
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
                ]
                break;
            case TetrisTile.T_SHAPE:
                this.color = '#1F363D'
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
                ]
                break;
            case TetrisTile.Z_SHAPE:
                this.color = '#053C5E'
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
                ]
                break;
            default:
                this.color = '#000000'
                this._shape = []
                break;
        }
    }


    ////////////////////////////////////////////
    /////////        GETTER         ////////////
    ////////////////////////////////////////////

    public get shape() {
        return this._shape[this._rotation]
    }

    public get rotation_shape() {
        return this._shape[(this._rotation + 1) % this._shape.length]
    }

    public get piece_tag() {
        switch (this._type) {
            case TetrisTile.I_SHAPE:
                return 'I'
            case TetrisTile.J_SHAPE:
                return 'J'
            case TetrisTile.L_SHAPE:
                return 'L'
            case TetrisTile.O_SHAPE:
                return 'O'
            case TetrisTile.S_SHAPE:
                return 'S'
            case TetrisTile.T_SHAPE:
                return 'T'
            case TetrisTile.Z_SHAPE:
                return 'Z'
            default:
                return '0'
        }
    }



    ////////////////////////////////////////////
    /////////         OTHER         ////////////
    ////////////////////////////////////////////

    public rotate() {
        this._rotation = (this._rotation + 1) % this._shape.length
    }

    public clone() {
        return new Piece(this._type, new Position(this.position.x, this.position.y))
    }
}

export default Piece