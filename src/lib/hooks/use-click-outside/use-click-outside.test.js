import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { useClickOutside } from "./use-click-outside";

const TestComponent = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const ref = useClickOutside(
    () => setIsOpen((prev) => !prev),
    ["keydown", "keyup"]
  );

  return (
    <div>
      {isOpen && <div data-testid="dummy">I should hidden</div>}
      <div data-testid="outside">I can close clicking here</div>
      <div ref={ref} data-testid="inside">
        I cannot close clicking here
      </div>
    </div>
  );
};

it("should close when mousedown outside", () => {
  render(<TestComponent />);
  userEvent.click(screen.getByTestId("outside"));
  expect(screen.queryByTestId("dummy")).not.toBeInTheDocument();
});

it("should close when touchstart outside", () => {
  render(<TestComponent />);
  fireEvent.touchStart(screen.getByTestId("outside"));
  expect(screen.queryByTestId("dummy")).not.toBeInTheDocument();
});

it("should not close when mousedown inside", () => {
  render(<TestComponent />);
  userEvent.click(screen.getByTestId("inside"));
  expect(screen.getByTestId("dummy")).toBeInTheDocument();
});

it("should not close when touchstart inside", () => {
  render(<TestComponent />);
  fireEvent.touchStart(screen.getByTestId("inside"));
  expect(screen.getByTestId("dummy")).toBeInTheDocument();
});

it("should works with multiple events", () => {
  render(<TestComponent />);
  fireEvent.touchStart(screen.getByTestId("inside"));
  expect(screen.getByTestId("dummy")).toBeInTheDocument();
  fireEvent.touchStart(screen.getByTestId("outside"));
  expect(screen.queryByTestId("dummy")).not.toBeInTheDocument();
});

it("should works with extra events", () => {
  render(<TestComponent />);
  fireEvent.keyDown(screen.getByTestId("inside"));
  expect(screen.getByTestId("dummy")).toBeInTheDocument();
  fireEvent.keyUp(screen.getByTestId("outside"));
  expect(screen.queryByTestId("dummy")).not.toBeInTheDocument();
});
