import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  // 1. globalCss va fuera de theme
  globalCss: {
    "html, body": {
      backgroundColor: "cream",
      color: "ink",
    },
  },

  theme: {
    tokens: {
      fonts: {
        body: { value: '"DM Sans", sans-serif' },
      },
      colors: {
        orangeBrand: { value: "#f05a32" },
        lime: { value: "#d7f05d" },
        ink: { value: "#171c1a" },
        cream: { value: "#f3f0e8" },
        paper: { value: "#fbfaf5" },
        line: { value: "hsla(156, 10%, 10%, 0.18)" },
      },
    },
    semanticTokens: {
      colors: {
        orangeBrand: { value: "{colors.orangeBrand}" },
        lime: { value: "{colors.lime}" },
        ink: { value: "{colors.ink}" },
        cream: { value: "{colors.cream}" },
        paper: { value: "{colors.paper}" },
        line: { value: "{colors.line}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
