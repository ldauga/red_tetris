import {act, renderHook, render} from '@testing-library/react'
import { vi, expect, test } from "vitest";
import GameSelector from "../packages/client/src/GameSelector";
import * as React from 'react'
import { useNavigate } from "react-router-dom"
import { MemoryRouter } from 'react-router-dom';

/**
 * @vitest-environment jsdom
 */

 
vi.mocked(useNavigate);

test("Game selector", async () => {
//   const mockedNavigate = vi.fn();
//   vi.mocked(useNavigate, mockedNavigate);
    const {result} = renderHook(() => GameSelector())

    await act(async () => {
        await result.current.onGo()
    });
//   const {result} = renderHook(() => <GameSelector/>);
//   console.log(result)
//   console.log(result.current.props.children)
//   act(() => {
//     result.current.props
//   });
});