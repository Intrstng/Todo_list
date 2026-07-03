import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { MyButton } from "@/stories/MyButton.tsx"
import SendIcon from "@mui/icons-material/Send"
import DeleteIcon from "@mui/icons-material/Delete"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/MyButton",
  component: MyButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "contained", "outlined"],
    },
    color: {
      control: "select",
      options: ["inherit", "primary", "secondary", "success", "error", "info", "warning"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    primary: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClickCallBack: fn() },
} satisfies Meta<typeof MyButton>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    children: "Button",
  },
}

export const Secondary: Story = {
  args: {
    primary: false,
    children: "Button",
  },
}

export const Large: Story = {
  args: {
    size: "large",
    children: "Button",
  },
}

export const Small: Story = {
  args: {
    size: "small",
    children: "Button",
  },
}

export const Contained: Story = {
  args: {
    variant: "contained",
    color: "primary",
    children: "Contained Button",
  },
}

export const Outlined: Story = {
  args: {
    variant: "outlined",
    color: "secondary",
    children: "Outlined Button",
  },
}

export const Text: Story = {
  args: {
    variant: "text",
    color: "primary",
    children: "Text Button",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
}

export const WithStartIcon: Story = {
  args: {
    startIcon: <SendIcon />,
    children: "Send",
  },
}

export const WithEndIcon: Story = {
  args: {
    endIcon: <DeleteIcon />,
    children: "Delete",
  },
}
