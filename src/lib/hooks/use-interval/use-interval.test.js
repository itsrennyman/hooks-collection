import { act, renderHook } from "@testing-library/react-hooks";
import { useInterval } from "./use-interval";

beforeEach(() => {
  jest.useFakeTimers();
});

it("should return the correct values", () => {
  const { result } = renderHook(() => useInterval(() => {}, 1000));
  expect(result.current.isActive).toBe(false);
  expect(result.current.start).toBeInstanceOf(Function);
  expect(result.current.stop).toBeInstanceOf(Function);
  expect(result.current.toggle).toBeInstanceOf(Function);
});

it("should start the interval", () => {
  const { result } = renderHook(() => useInterval(() => {}, 1000));

  expect(result.current.isActive).toBe(false);

  act(() => {
    result.current.start();
  });

  expect(result.current.isActive).toBe(true);
});

it("should stop the interval", () => {
  const { result } = renderHook(() => useInterval(() => {}, 1000));

  expect(result.current.isActive).toBe(false);

  act(() => {
    result.current.start();
  });

  expect(result.current.isActive).toBe(true);

  act(() => {
    result.current.stop();
  });

  expect(result.current.isActive).toBe(false);
});

it("should toggle the interval", () => {
  const { result } = renderHook(() => useInterval(() => {}, 1000));

  expect(result.current.isActive).toBe(false);

  act(() => {
    result.current.toggle();
  });

  expect(result.current.isActive).toBe(true);

  act(() => {
    result.current.toggle();
  });

  expect(result.current.isActive).toBe(false);
});
