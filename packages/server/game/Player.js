"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(name, socket) {
        this._name = name;
        this._socket = socket;
    }
    ////////////////////////////////////////////
    //////////         GETTER         //////////
    ////////////////////////////////////////////
    get name() {
        return this._name;
    }
    get socket() {
        return this._socket;
    }
}
exports.default = Player;
