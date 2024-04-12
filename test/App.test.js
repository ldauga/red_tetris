import { afterEach, describe } from 'vitest'
import http from 'http'
import app from '../packages/server/app.ts'
import request from 'supertest';
import io from 'socket.io-client';

const server = http.createServer(app)

describe("App", () => {

    test('GET /endpoint should return status 200', async () => {
        const response = await request(server).get('/');
        console.log(response.status)
    });


    describe("Socket", () => { 
        let clientSocket;

        beforeEach(() => {
            return new Promise(resolve => setTimeout(resolve, 100));
        });

        afterEach(async() => {
            clientSocket.disconnect();
        })

        test("Connection", async() => {
            const socketOptions = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
        
            clientSocket = io('http://localhost:4567', socketOptions);


            await new Promise((resolve) => {
                clientSocket.on('user Connected', () => {
                    resolve()
                })

                clientSocket.emit("connection");
            });
        })
        test("Start", async() => {

            const socketOptions = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
        
            clientSocket = io('http://localhost:4567', socketOptions);

            await new Promise((resolve) => {
                clientSocket.on('user Connected', async() => {
                    clientSocket.emit('start')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    clientSocket.emit('moveDown')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    clientSocket.emit('moveRight')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    clientSocket.emit('moveLeft')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    clientSocket.emit('rotate')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    clientSocket.emit('drop')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    resolve()
                })

                clientSocket.emit("connection");
            });
        });
        test("Start other list", async() => {

            const socketOptions = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
        
            clientSocket = io('http://localhost:4567', socketOptions);

            await new Promise((resolve) => {
                clientSocket.on('user Connected', async() => {
                    clientSocket.emit('startOtherList')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    resolve()
                })

                clientSocket.emit("connection");
            });
        });
        test("Move down", async() => {

            const socketOptions = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
        
            clientSocket = io('http://localhost:4567', socketOptions);

            await new Promise((resolve) => {
                clientSocket.on('user Connected', async() => {
                    clientSocket.emit('moveDown')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    resolve()
                })

                clientSocket.emit("connection");
            });
        });
        test("Move right", async() => {

            const socketOptions = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
        
            clientSocket = io('http://localhost:4567', socketOptions);

            await new Promise((resolve) => {
                clientSocket.on('user Connected', async() => {
                    clientSocket.emit('moveRight')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    resolve()
                })

                clientSocket.emit("connection");
            });
        });
        test("Move left", async() => {

            const socketOptions = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
        
            clientSocket = io('http://localhost:4567', socketOptions);

            await new Promise((resolve) => {
                clientSocket.on('user Connected', async() => {
                    clientSocket.emit('moveLeft')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    resolve()
                })

                clientSocket.emit("connection");
            });
        });
        test("Drop", async() => {

            const socketOptions = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
        
            clientSocket = io('http://localhost:4567', socketOptions);

            await new Promise((resolve) => {
                clientSocket.on('user Connected', async() => {
                    clientSocket.emit('drop')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    resolve()
                })

                clientSocket.emit("connection");
            });
        });
        test("Rotate", async() => {

            const socketOptions = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
        
            clientSocket = io('http://localhost:4567', socketOptions);

            await new Promise((resolve) => {
                clientSocket.on('user Connected', async() => {
                    clientSocket.emit('rotate')
                    await new Promise(resolve => setTimeout(resolve, 200));
                    resolve()
                })

                clientSocket.emit("connection");
            });
        });
        test("Connection username error", async() => {
            const socketOptions = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
            const socketOptionsOther = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
        
            clientSocket = io('http://localhost:4567', socketOptions);
            clientSocket = io('http://localhost:4567', socketOptionsOther);


            await new Promise((resolve) => {
                clientSocket.on('user Connected', async() => {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    clientSocket.emit("connection");
                })

                clientSocket.on('error', (arg) => {
                    console.log(arg)
                    resolve()
                })

                clientSocket.emit("connection");
            });
        });
        test("Connection error", async() => {
            const socketOptions = {
                query: {
                    room: 'exampleRoom',
                    username: 'exampleUser'
                }
            };
            const socketOptionsOther = {
                query: {
                    room: 'exampleRoom',
                    username: 'Alex'
                }
            };
        
            clientSocket = io('http://localhost:4567', socketOptions);
            const clientSocket2 = io('http://localhost:4567', socketOptionsOther);


            await new Promise((resolve) => {
                clientSocket.on('user Connected', async() => {
                    await new Promise(resolve => setTimeout(resolve, 200));
                })

                clientSocket.on('error', (arg) => {
                    clientSocket2.disconnect
                    resolve()
                })

                clientSocket.emit("connection");
            });
        });
        // test("Start", async() => {

        //     const socketOptions = {
        //         query: {
        //             room: 'exampleRoom@',
        //             username: 'exampleUserG'
        //         }
        //     };
        
        //     clientSocket = io('http://localhost:4567', socketOptions);

        //     await new Promise((resolve) => {
        //         clientSocket.on('user Connected', async() => {
        //             clientSocket.emit('start')
        //             await new Promise(resolve => setTimeout(resolve, 200));
        //             clientSocket.emit('moveDown')
        //             await new Promise(resolve => setTimeout(resolve, 200));
        //             resolve()
        //         })

        //         clientSocket.emit("connection");
        //     });
        // });
    })
})