import "@testing-library/jest-dom";
import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from ".";
import { PasswordInput } from "./PasswordInput";

describe("Normal Input", () => {
  it("with value:", async () => {
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
  it("with addon:", () => {
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
  it("focused by clicking addon:", async () => {
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
