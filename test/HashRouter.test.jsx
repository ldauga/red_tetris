import React from 'react'
import { beforeEach, describe, expect, test, vi } from "vitest";
import useHashRouter from "../packages/client/src/hooks/useHashRouter"
import { renderHook } from "@testing-library/react";
import { useLocation } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

vi.mocked(window.location)

describe('Hash router', async() => {

    beforeEach(() => {
      // tell vitest we use mocked time
      vi.mockReset
    })

    test("", () => {
      const mockedLocation = vi.fn();
      mockedLocation.mockReturnValue({ hash: "valeur-hash-initiale" });
      window.location.hash = "valeur-hash-initiale"
      vi.mocked(useLocation, mockedLocation);
  
      const { result, waitForNextUpdate } = renderHook(() => useHashRouter(), {
        wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
      });
      // expect(result.current[0]).toBe("valeur-hash-initiale");
    })
})