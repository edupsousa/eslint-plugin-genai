import { RuleTester } from "@typescript-eslint/rule-tester";

import descriptiveFunctionName from "./rule";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("my-rule", descriptiveFunctionName, {
  valid: ["notFooBar()", "const foo = 2", "const bar = 2"],
  invalid: [
    {
      code: "function foo() { return 0; }",
      errors: [{ messageId: "nonDescriptiveFunctionName" }],
    },
  ],
});
