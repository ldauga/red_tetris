import { render, screen } from '@testing-library/react'
import { test } from "vitest";
import GameSelector from "../packages/client/src/GameSelector";
import * as React from 'react'
import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event";
/**
 * @vitest-environment jsdom
 */

 
// vi.mocked(useNavigate);

test("Game selector", async () => {

    const user = userEvent.setup()

    render(
        <BrowserRouter>
            <GameSelector/>
        </BrowserRouter> 
    )

    user.type(screen.getByPlaceholderText("Username"), "hello")
    user.type(screen.getByPlaceholderText("Room"), "hey")
    await user.click(screen.getByText("Go")); 
});