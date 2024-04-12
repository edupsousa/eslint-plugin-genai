import { AST_NODE_TYPES, TSESLint } from "@typescript-eslint/utils";

type MessageIds =
  | "messageIdForSomeFailure"
  | "messageIdForSomeOtherFailure"
  | "messageIdForBadNaming";

const myRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "suggestion",
    messages: {
      messageIdForSomeFailure: "Error message for some failure",
      messageIdForSomeOtherFailure: "Error message for some other failure",
      messageIdForBadNaming: "I dont like the name of this function",
    },
    fixable: "code",
    schema: [], // no options
  },
  create: (context) => ({
    FunctionDeclaration: (node) => {
      console.log("Call GenAI API");
      return context.report({
        node,
        messageId: "messageIdForBadNaming",
      });
    },
  }),
};

export default myRule;
