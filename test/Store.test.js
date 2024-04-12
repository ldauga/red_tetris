import { describe, expect, test } from 'vitest';
import { store } from '../packages/client/src/store/store'
import { SocketActionTypes, socketMiddleware } from '../packages/client/src/middleware/socketMiddleware';

describe('Store', () => {
    test('Is defined store', () => {
        expect(store).toBeDefined();
    })
    describe("ACTIONS", () => {
            const action = {
            type: SocketActionTypes.DISCONNECT,
            data: { username: 'testUser', room: 'testRoom' }
            };
    
            const actionConnect = {
              type: SocketActionTypes.CONNECT,
              data: { username: 'testUser', room: 'testRoom' }
            };

            const mockNext = vi.fn();
    
            test("Reset socket", () => {
              socketMiddleware(store)(mockNext)(actionConnect);
              socketMiddleware(store)(mockNext)(action);
              expect(store.getState().rootReducer.socket).toBe(null)
            });

            test("Set socket", () => {
                socketMiddleware(store)(mockNext)(actionConnect);
                expect(store.getState().rootReducer.socket).not.toBe(null)
            });
    });
})


