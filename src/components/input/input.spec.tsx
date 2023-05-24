import "@testing-library/jest-dom";
import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input, PasswordInput, NumberInput, SwapInputs } from ".";

describe("Normal Input", () => {
  it("with value", async () => {
    const fn = vi.fn((val: string) => val);
    render(
      <div>
        <Input value={"a"} setValue={fn} />
      </div>
    );
    const input = screen.getByTestId("input");
    expect(input).toHaveValue("a");
    await userEvent.type(input, "b");
    expect(fn).toBeCalledWith("ab");
  });
  it("with addon", () => {
    render(
      <div>
        <Input
          prefix="Prefix"
          suffix="Suffix"
          label="Label"
          value={"3"}
          setValue={() => null}
        />
      </div>
    );
    expect(screen.getByText("Prefix")).toBeInTheDocument();
    expect(screen.getByText("Suffix")).toBeInTheDocument();
    expect(screen.getByText("Label")).toBeInTheDocument();
  });
  it("focused by clicking addon", async () => {
    render(
      <div>
        <Input prefix="Prefix" value={"3"} setValue={() => null} />
      </div>
    );
    await userEvent.click(screen.getByText("Prefix"));
    expect(screen.getByTestId("input")).toHaveFocus();
  });
});

describe("Password Input", () => {
  it("show/hide password", async () => {
    render(
      <div>
        <PasswordInput value={"a"} setValue={() => null} />
      </div>
    );
    const input = screen.getByTestId("input");
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(input).toHaveAttribute("type", "text");
    await userEvent.click(button);
    expect(input).toHaveAttribute("type", "password");
  });
});

describe("Number Input", () => {
  it("with value", async () => {
    const fn = vi.fn((val: string) => val);
    render(
      <div>
        <NumberInput value={"1"} setValue={fn} />
      </div>
    );
    const input = screen.getByTestId("input");
    expect(input).toHaveValue(1);
    await userEvent.type(input, "2");
    expect(fn).toBeCalledWith("12");
    await userEvent.type(input, "a");
    expect(fn).toBeCalledWith("12");
  });
  it("with addon", () => {
    render(
      <div>
        <NumberInput
          prefix="Prefix"
          suffix="Suffix"
          label="Label"
          value={""}
          setValue={() => null}
        />
      </div>
    );
    expect(screen.getByText("Prefix")).toBeInTheDocument();
    expect(screen.getByText("Suffix")).toBeInTheDocument();
    expect(screen.getByText("Label")).toBeInTheDocument();
  });
  it("focused by clicking addon", async () => {
    render(
      <div>
        <NumberInput prefix="Prefix" value={"3"} setValue={() => null} />
      </div>
    );
    await userEvent.click(screen.getByText("Prefix"));
    expect(screen.getByTestId("input")).toHaveFocus();
  });
  it("with max", async () => {
    const fn = vi.fn((val: string) => val);
    render(
      <div>
        <NumberInput value={""} min="2" max="5" setValue={fn} />
      </div>
    );
    const input = screen.getByTestId("input");
    await userEvent.type(input, "8");
    expect(fn).toBeCalledWith("5");
  });
  it("with min", async () => {
    const fn = vi.fn((val: string) => val);
    render(
      <div>
        <NumberInput value={""} min="2" max="5" setValue={fn} />
      </div>
    );
    const input = screen.getByTestId("input");

    await userEvent.type(input, "1");
    expect(fn).toBeCalledWith("2");
  });
});

describe("Swap Input", () => {
  const item1 = { id: "BNB", label: "BNB" };
  const item2 = { id: "ETH", label: "ETH" };
  const pairs = [
    {
      item1,
      item2,
    },
  ];
  const fn1 = vi.fn(() => null);
  const fn2 = vi.fn(() => null);
  it("do nothing when no item selected", async () => {
    render(
      <div>
        <SwapInputs
          pairs={pairs}
          fromItem={undefined}
          setFromItem={fn1}
          toItem={undefined}
          setToItem={fn2}
          fromAmount=""
          setFromAmount={() => ""}
          toAmount=""
          setToAmount={() => ""}
        />
      </div>
    );
    const btn = screen.getByTestId("button");
    await userEvent.click(btn);
    expect(fn1).not.toBeCalled();
    expect(fn2).not.toBeCalled();
  });
  it("swap items when both items selected", async () => {
    render(
      <div>
        <SwapInputs
          pairs={pairs}
          fromItem={item1}
          setFromItem={fn1}
          toItem={item2}
          setToItem={fn2}
          fromAmount=""
          setFromAmount={() => ""}
          toAmount=""
          setToAmount={() => ""}
        />
      </div>
    );
    const btn = screen.getByTestId("button");
    await userEvent.click(btn);
    expect(fn1).toBeCalledWith(item2);
    expect(fn2).toBeCalledWith(item1);
  });
  it("swap items when one item selected", async () => {
    render(
      <div>
        <SwapInputs
          pairs={pairs}
          fromItem={item1}
          setFromItem={fn1}
          toItem={undefined}
          setToItem={fn2}
          fromAmount=""
          setFromAmount={() => ""}
          toAmount=""
          setToAmount={() => ""}
        />
      </div>
    );
    const btn = screen.getByTestId("button");
    await userEvent.click(btn);
    expect(fn1).toBeCalledWith(undefined);
    expect(fn2).toBeCalledWith(item1);
  });
});
