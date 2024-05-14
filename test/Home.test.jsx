import * as React from 'react'
import { fireEvent, render, screen, cleanup} from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import Home from "../packages/client/src/Home"
import useHashRouter from "../packages/client/src/hooks/useHashRouter"
import { BrowserRouter, useNavigate } from "react-router-dom"
import { Provider, createStore, useDispatch } from "react-redux";
import { store } from "../packages/client/src/store/store";
import userEvent from '@testing-library/user-event';
import { SocketActionTypes } from "../packages/client/src/middleware/socketMiddleware.ts";
import { socketMiddleware } from '../packages/client/src/middleware/socketMiddleware'

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

vi.mock("../packages/client/src/store/store", () => ({
        store: {
            getState: () => {
                return { rootReducer : { socket: "notNull" }}
            }
        }
    }
));


describe("Home component", () => {
    afterEach(() => vi.clearAllMocks());
    describe("Handle key down", () => {
        beforeEach(() => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Home/>
                    </BrowserRouter>
                </Provider>
            )
        })
        
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

    // test("Connecting screen", async () => {

    //     vi.mock("../packages/client/src/store/store", () => ({
    //         store: {
    //             getState: () => {
    //                     return { rootReducer : { socket: null }}
    //                 }
    //             }
    //         }
    //     ));

    //     render(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <Home/>
    //             </BrowserRouter>
    //         </Provider>
    //     )
        
    //     const user = userEvent.setup()
    //     expect(screen.getAllByText(/connecting/i)).toBeDefined
    // });

    describe("Launch game", () => {
        beforeEach(async() => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Home/>
                    </BrowserRouter>
                </Provider>
            )
        });
        afterEach(() => {
            vi.clearAllMocks();
        })

        test("Game screen", async () => {
            expect(screen.getAllByText(/Wait for the Owner to start the game/i)).toBeDefined
        });

        // test("Game screen", async () => {
        //     expect(screen.getAllByText(/Wait ftor the Owner to start the game/i)).toBeDefined
        // });
    })

})