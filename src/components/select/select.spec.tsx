import "@testing-library/jest-dom";
import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Selector } from ".";
import { ReactNode } from "react";

describe("Normal Selector", () => {
  const options: { value: number | string; label: ReactNode }[] = [
    { value: 1, label: "1" },
    { value: "2", label: "2" },
  ];

  it("with number value option selected", async () => {
    render(
      <div>
        <Selector options={options} value={1} setValue={() => null} />
      </div>
    );
    expect(screen.getAllByText("1")).toHaveLength(2);
  });
  it("with string value option selected", async () => {
    render(
      <div>
        <Selector options={options} value={"2"} setValue={() => null} />
      </div>
    );
    expect(screen.getAllByText("2")).toHaveLength(2);
  });
  it("toggle option box", async () => {
    render(
      <div>
        <Selector options={options} value={1} setValue={() => null} />
      </div>
    );
    const selector = screen.getByTestId("selector");
    const option = screen.getByTestId("selector-options");
    expect(option).not.toBeVisible();
    await userEvent.click(selector);
    expect(option).toBeVisible();
    await userEvent.click(selector);
    expect(option).not.toBeVisible();
  });
  it("with addon", () => {
    render(
      <div>
        <Selector
          options={options}
          value={1}
          setValue={() => null}
          prefix="Prefix"
          suffix="Suffix"
          label="Label"
        />
      </div>
    );
    expect(screen.getByText("Prefix")).toBeInTheDocument();
    expect(screen.getByText("Suffix")).toBeInTheDocument();
    expect(screen.getByText("Label")).toBeInTheDocument();
  });
  it("select an option", async () => {
    const fn = vi.fn(() => null);
    render(
      <div>
        <Selector options={options} value={""} setValue={fn} />
      </div>
    );
    const selector = screen.getByTestId("selector");
    const option1 = screen.getByText("1");
    const option2 = screen.getByText("2");
    expect(screen.getAllByText("1")).toHaveLength(1);
    await userEvent.click(selector);
    expect(option1).toBeVisible();
    await userEvent.click(option1);
    expect(fn).toBeCalledWith(1);
    await userEvent.click(selector);
    expect(option2).toBeVisible();
    await userEvent.click(option2);
    expect(fn).toBeCalledWith("2");
  });
});
