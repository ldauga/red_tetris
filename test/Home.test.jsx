import * as React from 'react'
import { fireEvent, render, screen, cleanup} from "@testing-library/react";
import { afterEach, describe, test, vi } from "vitest";
import Home from "../packages/client/src/Home"
import useHashRouter from "../packages/client/src/hooks/useHashRouter"
import { BrowserRouter, useNavigate } from "react-router-dom"
import { Provider } from "react-redux";
import { store } from "../packages/client/src/store/store";
import userEvent from '@testing-library/user-event';

vi.mock("react-router-dom", () => ({
    useLocation: () => ({
      hash: "#test[1]"
    }),
    BrowserRouter: vi.fn().mockImplementation((props) => props.children),
    useNavigate: vi.fn(),
}));

vi.mock("react-redux", () => ({
    useDispatch: () => vi.fn(),
    Provider: vi.fn().mockImplementation((props) => props.children),
}));

const rootReducer =  {
    socket: "mockSocket"
}

describe("Home component", () => {
    afterEach(() => cleanup);
    
    // store.dispatch(setSocket)

    render(
        <Provider store={store}>
            <BrowserRouter>
                <Home/>
            </BrowserRouter>
        </Provider>
    )
    
    describe("Handle key down", () => {

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home/>
                </BrowserRouter>
            </Provider>
        )
        
        test('Arrow up', async() => {
            const user = userEvent.setup()
            await user.keyboard('[ArrowUp]')
        })
        test('Arrow down', async() => {
            const user = userEvent.setup()
            await user.keyboard('[ArrowDown]')
        })
        test('Arrow left', async() => {
            const user = userEvent.setup()
            await user.keyboard('[ArrowLeft]')
        })
        test('Arrow right', async() => {
            const user = userEvent.setup()
            await user.keyboard('[ArrowRight]')
        })
        test('Drop', async() => {
            const user = userEvent.setup()
            await user.keyboard(' ')
        })
    });

    test("Start game", async () => {

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home/>
                </BrowserRouter>
            </Provider>
        )
        
        const user = userEvent.setup()
        // screen.getByRole('button', {name: /sameGame/i})
        await user.click(screen.getAllByText("Restart the game with another list of piece"))
    })
})