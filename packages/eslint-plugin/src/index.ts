import { TSESLint } from "@typescript-eslint/utils";
import descriptiveFunctionName from "./rule";

export const rules = {
  "descriptive-function-name": descriptiveFunctionName,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;
