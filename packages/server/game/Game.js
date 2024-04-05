"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    constructor(current_piece, next_piece, player) {
        this._piece_list_index = 1;
        this._is_finish = false;
        this._score = 0;
        this._last_move_date = new Date();
        this._current_piece = current_piece;
        this._next_piece = next_piece;
        this._player = player;
        this._grid = [
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
        ];
    }
    ////////////////////////////////////////////
    /////////        GETTER         ////////////
    ////////////////////////////////////////////
    get player() {
        return this._player;
    }
    get grid() {
        return this._grid;
    }
    get is_finish() {
        return this._is_finish;
    }
    get next_piece() {
        return this._next_piece;
    }
    get score() {
        return this._score;
    }
    get last_move_date() {
        return this._last_move_date;
    }
    ////////////////////////////////////////////
    /////////        PRIVATES       ////////////
    ////////////////////////////////////////////
    _isCurrentTouch() {
        for (let y = 19; y >= 0; y--) {
            for (let x = 9; x >= 0; x--) {
                if (this._grid[y][x] == 'C') {
                    if (y == 19)
                        return true;
                    if (this._grid[y + 1][x] != 'C' && this._grid[y + 1][x] != '0' && this._grid[y + 1][x] != 's')
                        return true;
                }
            }
        }
        return false;
    }
    _isCurrentTouchRight() {
        for (let y = 19; y >= 0; y--) {
            for (let x = 9; x >= 0; x--) {
                if (this._grid[y][x] == 'C') {
                    if (x == 9)
                        return true;
                    if (this._grid[y][x + 1] != 'C' && this._grid[y][x + 1] != '0' && this._grid[y][x + 1] != 's')
                        return true;
                }
            }
        }
        return false;
    }
    _isCurrentTouchLeft() {
        for (let y = 19; y >= 0; y--) {
            for (let x = 9; x >= 0; x--) {
                if (this._grid[y][x] == 'C') {
                    if (x == 0)
                        return true;
                    if (this._grid[y][x - 1] != 'C' && this._grid[y][x - 1] != '0' && this._grid[y][x - 1] != 's')
                        return true;
                }
            }
        }
        return false;
    }
    _cleanBoardCurrentPiece() {
        for (let y = 19; y >= 0; y--) {
            for (let x = 9; x >= 0; x--) {
                if (this._grid[y][x] == 'C' || this._grid[y][x] == 's')
                    this._grid[y][x] = '0';
            }
        }
    }
    _displayCurrentPiece() {
        let grid_y = this._current_piece.position.y;
        for (let piece_y = 0; piece_y < this._current_piece.shape.length; piece_y++) {
            let grid_x = this._current_piece.position.x;
            for (let piece_x = 0; piece_x < this._current_piece.shape[piece_y].length; piece_x++) {
                if (this._current_piece.shape[piece_y][piece_x] == 1) {
                    if (this._grid[grid_y][grid_x] != '0' && this._grid[grid_y][grid_x] != 's') {
                        console.log(this._grid[grid_y][grid_x]);
                        this._player.socket.emit('game_over');
                        this._is_finish = true;
                    }
                    else
                        this._grid[grid_y][grid_x] = 'C';
                }
                grid_x++;
            }
            grid_y++;
        }
        let prev_y_line = -1;
        let line = 0;
        let uppest_y = 20;
        for (let y = 0; y <= 19; y++) {
            for (let x = 0; x <= 9; x++) {
                if (this._grid[y][x] == 'C') {
                    if (prev_y_line != y) {
                        line++;
                        prev_y_line = y;
                    }
                    if (y < 19 && this._grid[y + 1][x] != 'C') {
                        for (let check_y = y + 1; check_y <= 19; check_y++) {
                            if (check_y == 19 && check_y - (line - 1) < uppest_y) {
                                uppest_y = check_y - (line - 1);
                            }
                            if (this._grid[check_y][x] != '0' && this._grid[y][x] != 's' && check_y - (line) < uppest_y)
                                uppest_y = check_y - (line);
                        }
                    }
                    else if (y == 19) {
                        if (y - (line - 1) < uppest_y) {
                            uppest_y = y - (line - 1);
                        }
                    }
                }
            }
        }
        if (uppest_y != this._current_piece.position.y) {
            grid_y = uppest_y;
            for (let piece_y = 0; piece_y < this._current_piece.shape.length; piece_y++) {
                let grid_x = this._current_piece.position.x;
                for (let piece_x = 0; piece_x < this._current_piece.shape[piece_y].length; piece_x++) {
                    if (grid_y < 20 && grid_x < 10)
                        if (this._current_piece.shape[piece_y][piece_x] == 1 && this._grid[grid_y][grid_x] != 'C')
                            this._grid[grid_y][grid_x] = 's';
                    grid_x++;
                }
                grid_y++;
            }
        }
    }
    _isLineFull() {
        for (let y = 19; y >= 0; y--) {
            const line = "".concat(...this._grid[y]);
            if (line.search('0') < 0 && line.search('X') < 0)
                return y;
        }
        return -1;
    }
    ////////////////////////////////////////////
    /////////         MOVES         ////////////
    ////////////////////////////////////////////
    moveDown() {
        if (!this._isCurrentTouch())
            this._current_piece.position.y++;
        this._cleanBoardCurrentPiece();
        this._displayCurrentPiece();
        this._last_move_date = new Date();
    }
    moveRight() {
        if (!this._isCurrentTouchRight())
            this._current_piece.position.x++;
        this._cleanBoardCurrentPiece();
        this._displayCurrentPiece();
        this._last_move_date = new Date();
    }
    moveLeft() {
        if (!this._isCurrentTouchLeft())
            this._current_piece.position.x--;
        this._cleanBoardCurrentPiece();
        this._displayCurrentPiece();
        this._last_move_date = new Date();
    }
    drop() {
        if (this._isCurrentTouch())
            return;
        let prev_y_line = -1;
        let line = 0;
        let uppest_y = 20;
        for (let y = 0; y <= 19; y++) {
            for (let x = 0; x <= 9; x++) {
                if (this._grid[y][x] == 'C') {
                    if (prev_y_line != y) {
                        line++;
                        prev_y_line = y;
                    }
                    if (this._grid[y + 1][x] != 'C') {
                        for (let check_y = y + 1; check_y <= 19; check_y++) {
                            if (check_y == 19 && check_y - (line - 1) < uppest_y) {
                                uppest_y = check_y - (line - 1);
                            }
                            if (this._grid[check_y][x] != '0' && this._grid[check_y][x] != 's' && check_y - (line) < uppest_y)
                                uppest_y = check_y - (line);
                        }
                    }
                }
            }
        }
        this._current_piece.position.y = uppest_y;
        this._cleanBoardCurrentPiece();
        this._displayCurrentPiece();
        this._last_move_date = new Date();
        this._last_move_date.setHours(this._last_move_date.getHours() - 1);
    }
    rotate() {
        const rotate_shape = this._current_piece.rotation_shape;
        if (this._current_piece.position.y + rotate_shape.length > 20)
            return;
        if (this._current_piece.position.x + rotate_shape[0].length > 10)
            return;
        let grid_y = this._current_piece.position.y;
        for (let piece_y = 0; piece_y < rotate_shape.length; piece_y++) {
            let grid_x = this._current_piece.position.x;
            for (let piece_x = 0; piece_x < rotate_shape[piece_y].length; piece_x++) {
                if (rotate_shape[piece_y][piece_x] == 1 && this._grid[grid_y][grid_x] != 'C' && this._grid[grid_y][grid_x] != 's' && this._grid[grid_y][grid_x] != '0')
                    return;
                grid_x++;
            }
            grid_y++;
        }
        this._current_piece.rotate();
        this._cleanBoardCurrentPiece();
        this._displayCurrentPiece();
        this._last_move_date = new Date();
    }
    remove_line() {
        for (let y = 19; y >= 0; y--) {
            for (let x = 0; x <= 9; x++) {
                if (y == 0)
                    this._grid[y][x] = '0';
                else
                    this._grid[y][x] = this._grid[y - 1][x];
            }
        }
        // this._current_piece.rotate()
        this._cleanBoardCurrentPiece();
        this._displayCurrentPiece();
        // this._last_move_date = new Date()
    }
    ////////////////////////////////////////////
    /////////         OTHER         ////////////
    ////////////////////////////////////////////
    start(current_piece, next_piece) {
        this._current_piece = current_piece;
        this._next_piece = next_piece;
        this._is_finish = false;
        this._piece_list_index = 1;
        this._score = 0;
        this._last_move_date = new Date();
        this._grid = [
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0',],
        ];
        this._displayCurrentPiece();
    }
    add_line(number_of_line) {
        this._cleanBoardCurrentPiece();
        for (let y = 0; y < this._grid.length; y++) {
            for (let x = 0; x < this._grid[y].length; x++) {
                if (y >= 20 - number_of_line)
                    this.grid[y][x] = 'X';
                else
                    this._grid[y][x] = this._grid[y + number_of_line][x];
            }
        }
        this._current_piece.position.y = Math.max(this._current_piece.position.y - number_of_line, 0);
        this._displayCurrentPiece();
    }
    update(piece_list, other_games) {
        let touch = this._isCurrentTouch();
        if (!touch) {
            this._current_piece.position.y++;
            this._cleanBoardCurrentPiece();
            this._displayCurrentPiece();
        }
        else {
            for (let y = 19; y >= 0; y--) {
                for (let x = 9; x >= 0; x--) {
                    if (this._grid[y][x] == 'C')
                        this._grid[y][x] = this._current_piece.piece_tag;
                }
            }
            let number_line = 0;
            while (this._isLineFull() >= 0) {
                number_line++;
                for (let y = this._isLineFull(); y >= 0; y--) {
                    for (let x = 0; x <= 9; x++) {
                        if (y == 0)
                            this._grid[y][x] = '0';
                        else
                            this._grid[y][x] = this._grid[y - 1][x];
                    }
                }
            }
            if (number_line) {
                switch (number_line) {
                    case 1:
                        this._score += 40;
                        break;
                    case 2:
                        this._score += 100;
                        break;
                    case 3:
                        this._score += 200;
                        break;
                    case 4:
                        this._score += 400;
                        break;
                    default:
                        break;
                }
            }
            if (number_line > 1) {
                for (let index = 0; index < other_games.length; index++) {
                    const element = other_games[index];
                    element.add_line(number_line - 1);
                }
            }
            this._piece_list_index++;
            this._current_piece = this._next_piece;
            this._next_piece = piece_list.get(this._piece_list_index);
            this._displayCurrentPiece();
        }
        this._last_move_date = new Date();
    }
}
exports.default = Game;
