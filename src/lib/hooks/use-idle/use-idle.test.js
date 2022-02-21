import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useIdle } from "./use-idle";

describe("use-idle", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should return idle state", () => {
    const { result } = renderHook(() => useIdle(1000));
    expect(result.current).toBe(true);
  });

  it("should return false on firing keypress event", () => {
    const { result } = renderHook(() => useIdle(1000));

    expect(result.current).toBe(true);

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keypress"));
    });

    expect(result.current).toBe(false);

    setTimeout(() => {
      expect(result.current).toBe(true);
    }, 1001);
  });

  it("should return false on firing mousemove event", () => {
    const { result } = renderHook(() => useIdle(1000));

    expect(result.current).toBe(true);

    act(() => {
      document.dispatchEvent(new MouseEvent("mousemove"));
    });

    expect(result.current).toBe(false);

    setTimeout(() => {
      expect(result.current).toBe(true);
    }, 1001);
  });

  it("should return false on firing touchmove event", () => {
    const { result } = renderHook(() => useIdle(1000));

    expect(result.current).toBe(true);

    act(() => {
      document.dispatchEvent(new TouchEvent("touchmove"));
    });

    expect(result.current).toBe(false);

    setTimeout(() => {
      expect(result.current).toBe(true);
    }, 1001);
  });

  it("should return false on multiple firing events", () => {
    const { result } = renderHook(() => useIdle(1000));

    expect(result.current).toBe(true);

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keypress"));
    });

    expect(result.current).toBe(false);

    setTimeout(() => {
      expect(result.current).toBe(true);
    }, 1001);

    act(() => {
      document.dispatchEvent(new MouseEvent("mousemove"));
    });

    expect(result.current).toBe(false);

    setTimeout(() => {
      expect(result.current).toBe(true);
    }, 1001);
  });
});
