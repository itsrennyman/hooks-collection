import { renderHook } from "@testing-library/react-hooks";
import { useId } from "./use-id";

it("should return a unique id", () => {
  const { result } = renderHook(() => useId());
  expect(result.current.startsWith("useId-")).toBe(true);
});

it("should be long 15 characters", () => {
  const { result } = renderHook(() => useId());
  expect(result.current.length).toBe(15);
});
