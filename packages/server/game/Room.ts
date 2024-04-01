import Game from "./Game";
import Piece from "./Piece";
import PieceList from "./PieceList";
import Player from "./Player";

class Room {
    private _name: string;
    private _main_player: Player

    private _games: Game[] = []

    private _piece_list: PieceList = new PieceList()

    private _is_running: boolean = false

    constructor(name: string, main_player: Player) {
        this._name = name
        this._main_player = main_player
        this._main_player.socket.emit('main_player')

        this._games.push(new Game(this._piece_list.get(0), this._piece_list.get(1), main_player))
    }


    ////////////////////////////////////////////
    /////////        GETTER         ////////////
    ////////////////////////////////////////////


    public get main_player() {
        return this._main_player
    }

    public get name() {
        return this._name
    }

    public get length_game() {
        return this._games.length
    }

    public get is_running() {
        return this._is_running
    }



    ////////////////////////////////////////////
    //////////      PLAYER UTILS      //////////
    ////////////////////////////////////////////



    public addPlayer(player: Player) {
        this._games.push(new Game(this._piece_list.get(0), this._piece_list.get(1), player))
    }

    public removePlayer(player_name: string) {
        const game_index = this._games.findIndex(game => game.player.name == player_name)

        this._games.splice(game_index, 1)


        if (player_name === this._main_player.name) {
            if (this._games.length) {
                this._main_player = this._games[0].player
                this._main_player.socket.emit('main_player')
            }
        }
        if (this._games.length == 1 && this._is_running)
            this._games[0].player.socket.emit('victory')
    }

    public getUserGame(username: string) {
        if (!this.isUserInHere(username))
            return null

        return this._games.find(game => game.player.name === username)!
    }

    public isUserInHere(username: string) {
        if (this._games.find(game => game.player.name == username))
            return true
        return false
    }







    ////////////////////////////////////////////
    //////////         OTHER          //////////
    ////////////////////////////////////////////

    public start() {
        this._is_running = true

        for (let index = 0; index < this._games.length; index++) {
            const element = this._games[index];
            element.player.socket.emit('started')
            element.start(this._piece_list.get(0), this._piece_list.get(1))
        }
    }

    public emit() {
        for (let index = 0; index < this._games.length; index++) {
            const element = this._games[index];

            const other_games = this._games.filter((_, i) => i != index)

            if (!element.is_finish)
                element.player.socket.emit('update', { grid: element.grid, next_piece: element.next_piece.shape, next_piece_tag: element.next_piece.piece_tag, score: element.score, preview_other_players: other_games.map(game => ({grid: game.grid, name: game.player.name, score: game.score, next_piece: game.next_piece.shape, next_piece_tag: game.next_piece.piece_tag}))})
        }
    }

    public update() {
        if (this._games.length > 1 && this._games.filter(game => !game.is_finish).length == 1) {
            this._games.filter(game => !game.is_finish)[0].player.socket.emit('victory')
        }



        for (let index = 0; index < this._games.length; index++) {
            const element = this._games[index];

            if (!element.is_finish)
                element.update(this._piece_list, this._games.filter(game => game.player.name != element.player.name))
        }

    }

}

export default Room