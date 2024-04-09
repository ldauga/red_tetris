import { beforeEach, describe, expect, test, vi } from 'vitest'
import { socketMiddleware, SocketActionTypes } from '../packages/client/src/middleware/socketMiddleware'
import { io } from 'socket.io-client';

describe("Middleware", () => {
    test("Types", () => {
        expect(SocketActionTypes.CONNECT).toBe("socket/connect")
        expect(SocketActionTypes.DISCONNECT).toBe("socket/disconnect")
        expect(SocketActionTypes.EMIT).toBe("socket/emit")
        expect(SocketActionTypes.ON).toBe("socket/on")
    })
    describe("Sockets", () => {
      beforeEach(() => {
          vi.clearAllMocks();
      });
      
      const mockStore = {};
      const rootReducer = {};
      
      Object.defineProperty(rootReducer, 'rootReducer', {
        value:  { 
          socket: {
            disconnect: vi.fn(),
            emit: vi.fn(),
            on: vi.fn()
          },
          setSocket: vi.fn(),
          resetSocket: vi.fn()
        },
      });

      Object.defineProperty(mockStore, 'getState', {
        value: () => rootReducer
      });

      const mockStoreNullSock = {};
      const rootReducerNullSock = {};

      Object.defineProperty(rootReducerNullSock, 'rootReducer', {
        value:  { 
          socket: null,
          setSocket: vi.fn(),
          resetSocket: vi.fn()
        },
      });

      Object.defineProperty(mockStoreNullSock, 'getState', {
        value: () => rootReducerNullSock
      });
      
      const mockNext = vi.fn();

      describe('Connect', () => {

        const action = {
          type: SocketActionTypes.CONNECT,
          data: { username: 'testUser', room: 'testRoom' }
        };

        test("Connect and set socket", () => {
          const mockStoreConnect = {};
          const rootReducerConnect = {};
          
          Object.defineProperty(rootReducerConnect, 'rootReducer', {
            value:  { 
              socket: null,
              setSocket: vi.fn(),
            },
          });

          Object.defineProperty(mockStoreConnect, 'getState', {
            value: () => rootReducerConnect
          });

          socketMiddleware(mockStoreConnect)(mockNext)(action);
          expect(mockStoreConnect.getState().rootReducer.setSocket).toHaveBeenCalled()
        });

        test("Connect and not set socket", () => {
          const mockStoreConnect = {};
          const rootReducer = {};
          
          Object.defineProperty(rootReducer, 'rootReducer', {
            value:  { 
              socket: {},
              setSocket: vi.fn(),
            },
          });

          Object.defineProperty(mockStoreConnect, 'getState', {
            value: () => rootReducer
          });

          socketMiddleware(mockStoreConnect)(mockNext)(action);
          expect(mockStoreConnect.getState().rootReducer.setSocket).not.toHaveBeenCalled()
        });
      })

      describe('Disconnect', () => {

        const action = {
        type: SocketActionTypes.DISCONNECT,
        data: { username: 'testUser', room: 'testRoom' }
        };

        test("Disconnect with socket", () => {
          socketMiddleware(mockStore)(mockNext)(action);
          expect(mockStore.getState().rootReducer.socket.disconnect).toHaveBeenCalled()
        });

        test("Disconnect without socket", () => {
          socketMiddleware(mockStoreNullSock)(mockNext)(action);
          expect(mockStoreNullSock.getState().rootReducer.resetSocket).not.toHaveBeenCalled()
        });
      })

      describe('Emit', () => {
        
        const action = {
          type: SocketActionTypes.EMIT,
          data: { username: 'testUser', room: 'testRoom' }
        };

        test("Emit with socket", () => {
          socketMiddleware(mockStore)(mockNext)(action);
          expect(mockStore.getState().rootReducer.socket.emit).toHaveBeenCalled()
        });

        test("Emit without socket", () => {
          socketMiddleware(mockStoreNullSock)(mockNext)(action);
        });
      })

      describe('On', () => {
        
        const action = {
        type: SocketActionTypes.ON,
        data: { username: 'testUser', room: 'testRoom' }
        };

        test("On with socket", () => {
            socketMiddleware(mockStore)(mockNext)(action);
            expect(mockStore.getState().rootReducer.socket.on).toHaveBeenCalled()
        });

        test("On without socket", () => {
          socketMiddleware(mockStoreNullSock)(mockNext)(action);
        });
      })

      test("Default", () => {
          const action = {
          type: SocketActionTypes.Default,
          data: { username: 'testUser', room: 'testRoom' }
          };
          socketMiddleware(mockStore)(mockNext)(action);
      });

  })
})