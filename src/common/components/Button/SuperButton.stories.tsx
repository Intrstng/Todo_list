import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/common/components/Button/Button.tsx" // Adjust import path as needed
import SendIcon from "@mui/icons-material/Send"
import DeleteIcon from "@mui/icons-material/Delete"
import { fn } from "storybook/test"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SuperButton",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"], // Adds DOCS
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "contained", "outlined"],
      description: "The variant of the button",
    },
    color: {
      control: "select",
      options: ["inherit", "primary", "secondary", "success", "error", "info", "warning"],
      description: "The color of the button",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    children: {
      control: "text",
      description: "The content of the button",
    },
    startIcon: {
      control: false,
      description: "Icon displayed at the start of the button",
    },
    endIcon: {
      control: false,
      description: "Icon displayed at the end of the button",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    onClickCallBack: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

// Basic Variants
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
    color: "primary",
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

// Color Variants
export const Primary: Story = {
  args: {
    variant: "contained",
    color: "primary",
    children: "Primary Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "contained",
    color: "secondary",
    children: "Secondary Button",
  },
}

export const Success: Story = {
  args: {
    variant: "contained",
    color: "success",
    children: "Success Button",
  },
}

export const Error: Story = {
  args: {
    variant: "contained",
    color: "error",
    children: "Error Button",
  },
}

export const Warning: Story = {
  args: {
    variant: "contained",
    color: "warning",
    children: "Warning Button",
  },
}

export const Info: Story = {
  args: {
    variant: "contained",
    color: "info",
    children: "Info Button",
  },
}

// Size Variants
export const Large: Story = {
  args: {
    variant: "contained",
    color: "primary",
    size: "large",
    children: "Large Button",
  },
}

export const Medium: Story = {
  args: {
    variant: "contained",
    color: "primary",
    size: "medium",
    children: "Medium Button",
  },
}

export const Small: Story = {
  args: {
    variant: "contained",
    color: "primary",
    size: "small",
    children: "Small Button",
  },
}

// States
export const Disabled: Story = {
  args: {
    variant: "contained",
    color: "primary",
    disabled: true,
    children: "Disabled Button",
  },
}

// With Icons
export const WithStartIcon: Story = {
  args: {
    variant: "contained",
    color: "primary",
    startIcon: <SendIcon />,
    children: "Send",
  },
}

export const WithEndIcon: Story = {
  args: {
    variant: "contained",
    color: "primary",
    endIcon: <DeleteIcon />,
    children: "Delete",
  },
}

export const WithBothIcons: Story = {
  args: {
    variant: "contained",
    color: "primary",
    startIcon: <SendIcon />,
    endIcon: <DeleteIcon />,
    children: "Send & Delete",
  },
}

// Combined Variants - shows all combinations
export const AllVariants: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="contained" color="primary" onClickCallBack={() => {}}>
        Contained
      </Button>
      <Button variant="outlined" color="primary" onClickCallBack={() => {}}>
        Outlined
      </Button>
      <Button variant="text" color="primary" onClickCallBack={() => {}}>
        Text
      </Button>
      <Button variant="contained" color="secondary" onClickCallBack={() => {}}>
        Secondary
      </Button>
      <Button variant="contained" color="success" onClickCallBack={() => {}}>
        Success
      </Button>
      <Button variant="contained" color="error" onClickCallBack={() => {}}>
        Error
      </Button>
      <Button variant="contained" color="primary" disabled onClickCallBack={() => {}}>
        Disabled
      </Button>
      <Button variant="contained" color="primary" startIcon={<SendIcon />} onClickCallBack={() => {}}>
        With Icon
      </Button>
    </div>
  ),
}
