// Import required modules


import express from 'express'
import { Server, Socket } from 'socket.io';
import http from 'http'

import colors from 'colors'
colors.enable()

import { fileURLToPath } from 'url';
import path from 'path'

import cron from 'node-cron'

import Room from './game/Room'
import Player from './game/Player';

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const PORT = process.env.PORT || 4567;


const room_list: Room[] = []

const connected_socket: {
    socket_id: string,
    room: string,
    username: string,
}[] = []




setInterval(() => {
    for (let index = 0; index < room_list.length; index++) {
        const element = room_list[index];
        if (element.is_running) {
            element.emit()
        }
    }
}, 50);

setInterval(() => {
    for (let index = 0; index < room_list.length; index++) {
        const element = room_list[index];
        if (element.is_running) {
            element.update()
        }
    }
}, 50);



const getCurrentUser = (socket: Socket) => {
    return connected_socket.find(connected => connected.socket_id == socket.id)!
}

const getCurrentRoomIndex = (socket: Socket) => {
    const user = getCurrentUser(socket)

    return room_list.findIndex(room => room.name == user.room && room.isUserInHere(user.username))
}

io.on('connection', (socket) => {
    const { room, username } = socket.handshake.query

    if (typeof (room) != 'string' || typeof (username) != 'string')
        return

    let error = ''

    if (room_list.findIndex(r => r.name === room) >= 0) {
        if (room_list[room_list.findIndex(r => r.name === room)].is_running) {
            error = 'Game already running'
            socket.emit('error', { msg: error })
        }
        else {
            if (room_list[room_list.findIndex(r => r.name === room)].isUserInHere(username)) {

                error = 'Username already taken'
                socket.emit('error', { msg: error })
            }
            else
                room_list[room_list.findIndex(r => r.name === room)].addPlayer(new Player(username, socket))
        }

    } else {
        room_list.push(new Room(room, new Player(username, socket)))
    }


    if (!error) {
        console.log('================================================='.green)
        console.log('                Client connected :'.green)
        console.table({ socket_id: socket.id, room: room, username: username })
        console.log('================================================='.green)
        connected_socket.push({ socket_id: socket.id, room: room, username: username })

        console.log('================================================='.yellow)
        console.log('                      Room List'.yellow)
        console.table(room_list.map(room => ({ name: room.name, main_player: room.main_player.name, game_length: room.length_game, })))
        console.log('================================================='.yellow)
    }




    socket.on('start', () => {
        console.log('event start recive'.gray)
        const user = getCurrentUser(socket)
        const room_index = getCurrentRoomIndex(socket)

        if (room_list[room_index].main_player.name === user.username) {
            room_list[room_index].start()
        }
    })
    socket.on('startOtherList', () => {
        console.log('event startOtherList recive'.gray);
        const user = getCurrentUser(socket);
        const room_index = getCurrentRoomIndex(socket);
        if (room_list[room_index].main_player.name === user.username) {
            room_list[room_index].start(true);
        }
    });

    socket.on('moveDown', () => {
        console.log('event moveDown recive'.gray)
        const user = getCurrentUser(socket)
        const room_index = getCurrentRoomIndex(socket)

        if (room_list[room_index].is_running) {
            const game = room_list[room_index].getUserGame(user.username)
            if (game && !game.is_finish)
                game.moveDown()

        }
    })
    socket.on('moveRight', () => {
        console.log('event moveRight recive'.gray)
        const user = getCurrentUser(socket)
        const room_index = getCurrentRoomIndex(socket)

        if (room_list[room_index].is_running) {
            const game = room_list[room_index].getUserGame(user.username)
            if (game && !game.is_finish)
                game.moveRight()

        }
    })
    socket.on('moveLeft', () => {
        console.log('event moveLeft recive'.gray)
        const user = getCurrentUser(socket)
        const room_index = getCurrentRoomIndex(socket)

        if (room_list[room_index].is_running) {
            const game = room_list[room_index].getUserGame(user.username)
            if (game && !game.is_finish)
                game.moveLeft()

        }
    })
    socket.on('drop', () => {
        console.log('event drop recive'.gray)
        const user = getCurrentUser(socket)
        const room_index = getCurrentRoomIndex(socket)

        if (room_list[room_index].is_running) {
            const game = room_list[room_index].getUserGame(user.username)
            if (game && !game.is_finish)
                game.drop()

        }
    })
    socket.on('rotate', () => {
        console.log('event rotate recive'.gray)
        const user = getCurrentUser(socket)
        const room_index = getCurrentRoomIndex(socket)

        if (room_list[room_index].is_running) {
            const game = room_list[room_index].getUserGame(user.username)
            if (game && !game.is_finish)
                game.rotate()

        }
    })




    socket.on('disconnect', () => {
        if (connected_socket.findIndex((s) => s.socket_id == socket.id) >= 0) {

            const disconected_socket = connected_socket.splice(connected_socket.findIndex((s) => s.socket_id == socket.id), 1)[0]

            console.log('================================================='.red)
            console.log('               Client disconected'.red)
            console.table(disconected_socket)
            console.log('================================================='.red)

            const room_index = room_list.findIndex(room => room.name == disconected_socket.room)

            if (room_index >= 0) {
                const room = room_list[room_index]

                room.removePlayer(disconected_socket.username)

                if (!room.length_game)
                    room_list.splice(room_index, 1)


                console.log('================================================='.yellow)
                console.log('                      Room List'.yellow)
                console.table(room_list.map(room => ({ name: room.name, main_player: room.main_player.name, game_length: room.length_game, })))
                console.log('================================================='.yellow)
            }
        }
    })



});

server.listen(PORT as number, process.env.IP || '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});


app.use(express.static(path.join(process.env.PWD as string, '../client/dist')));

app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(process.env.PWD as string, '../client/dist/index.html'));
});