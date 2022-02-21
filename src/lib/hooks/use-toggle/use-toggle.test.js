import { act, renderHook } from "@testing-library/react-hooks";
import { useToggle } from "./use-toggle";

it("should return the correct initial value", () => {
  const { result } = renderHook(() => useToggle("foo", ["foo", "bar"]));
  expect(result.current[0]).toBe("foo");
});

it("should change the value when toggle is called", () => {
  const { result } = renderHook(() => useToggle("foo", ["foo", "bar"]));

  expect(result.current[0]).toBe("foo");

  act(() => {
    result.current[1]();
  });

  expect(result.current[0]).toBe("bar");

  act(() => {
    result.current[1]();
  });

  expect(result.current[0]).toBe("foo");
});
