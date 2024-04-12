import globals from "globals";
import tseslint from "typescript-eslint";
import genaiPlugin from "../dist/index.js";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: { genai: genaiPlugin },
    rules: { "genai/my-rule-name": "error" },
  },

  ...tseslint.configs.recommended,
];
