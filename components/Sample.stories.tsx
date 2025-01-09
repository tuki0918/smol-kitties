import type { Meta, StoryObj } from "@storybook/react";

import Sample from "./Sample";

const meta = {
  title: "Sample",
  component: Sample,
  tags: ["autodocs"],
} satisfies Meta<typeof Sample>;

export default meta;
type Story = StoryObj<typeof Sample>;

export const Default: Story = {
  args: {
    text: "text",
  },
};
