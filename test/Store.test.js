import { describe, expect, test } from 'vitest';
import { store, resetSocket } from '../packages/client/src/store/store'

describe('Store', () => {
    test('Is defined store', () => {
        expect(store).toBeDefined();
    })
    // test('Reset socket', () => {
    //     resetSocket()
    // })
})