import type { Meta, StoryObj } from "@storybook/react";
import Input from "../components/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const meta = {
  title: "Example/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

let value = "";

export const Addon: Story = {
  args: {
    value,
    setValue: (val) => (value = val),
    label: "Location:",
    placeholder: "city, area..",
    suffix: <FontAwesomeIcon icon={solid("location-dot")} />,
  },
};

export const Flat: Story = {
  args: {
    value,
    setValue: (val) => (value = val),
    placeholder: "city, area..",
  },
};

export const Validate: Story = {
  args: {
    value,
    setValue: (val) => (value = val),
    placeholder: "Numbers Only",
    validate: (val: string) => !Number.isNaN(Number(val)),
  },
};

export const Translate: Story = {
  args: {
    value,
    setValue: (val) => (value = val),
    placeholder: "Uppercase",
    translate: (val: string) => val.toUpperCase(),
  },
};
