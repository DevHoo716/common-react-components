import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "..";

const meta = {
  title: "Input/Normal",
  component: Input,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: "test",
    label: "Label",
    suffix: ".suffix",
  },
};
