export const colorTokens = {
  background: {
    base: "bg-white",
    hover: "bg-gray-700",
    selected: "bg-cyan-200",
    dark: "bg-black",
    darkCard: "bg-gray-800",
  },
  border: {
    base: "border-gray-200",
    focus: "border-cyan-600",
    dark: "border-gray-700",
  },
  text: {
    primary: "text-gray-900",
    secondary: "text-gray-500",
    accent: "text-cyan-600",
    danger: "text-red-600",
    light: "text-white",
  },
  button: {
    primary: "bg-cyan-700 text-white hover:bg-cyan-800",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  },
  badge: {
    primary: {
      solid: "bg-cyan-700 text-white",
      subtle: "bg-cyan-100 text-cyan-800",
      outline: "border border-cyan-700 text-cyan-700",
    },
    secondary: {
      solid: "bg-gray-800 text-white",
      subtle: "bg-gray-100 text-gray-800",
      outline: "border border-gray-400 text-gray-700",
    },
    danger: {
      solid: "bg-red-600 text-white",
      subtle: "bg-red-100 text-red-700",
      outline: "border border-red-600 text-red-600",
    },
    neutral: {
      solid: "bg-gray-200 text-gray-900",
      subtle: "bg-gray-100 text-gray-700",
      outline: "border border-gray-300 text-gray-600",
    },
  },
} as const;
