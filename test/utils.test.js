import { expect, test } from "vitest";
import { BACK_URL } from '../packages/client/src/utils/ip'

test('ip', () => {
    expect(BACK_URL).toBe('localhost')
})