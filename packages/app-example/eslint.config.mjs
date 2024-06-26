import globals from "globals";
import tseslint from "typescript-eslint";
import genaiPlugin from "../eslint-plugin/dist/index.js";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: { genai: genaiPlugin },
    rules: { "genai/descriptive-function-name": "error" },
  },

  ...tseslint.configs.recommended,
];
