import { beforeEach, describe, expect, test, vi } from "vitest";
import useHashRouter from "../packages/client/src/hooks/useHashRouter"
import { renderHook } from "@testing-library/react";

vi.mock("react-router-dom", () => ({
  useLocation: () => ({
    hash: "valeur-hash-initiale"
  })
}));

describe('Hash router', async() => {

    beforeEach(() => {
      vi.mockReset
    })

    test("Set hash value", () => {
      const { result } = renderHook(() => useHashRouter())
      expect(result.current[0]).toBe("valeur-hash-initiale");
    })
})