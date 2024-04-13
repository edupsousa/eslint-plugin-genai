import { TSESLint, TSESTree } from "@typescript-eslint/utils";

type MessageIds = "nonDescriptiveFunctionName";

const descriptiveFunctionName: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "suggestion",
    hasSuggestions: true,
    messages: {
      nonDescriptiveFunctionName:
        "Function name '{{ name }}' was rated '{{ rating }}' in a 0-10 scale. Try '{{ nameSuggestion }}' instead.",
    },
    fixable: "code",
    schema: [], // no options
  },
  create: (context) => {
    const functions: Array<{
      name: string;
      sourceCode: string;
      node: TSESTree.FunctionDeclaration;
    }> = [];
    return {
      FunctionDeclaration: (node) => {
        const name = node.id?.name;
        if (!name) return;
        const sourceCode = context.sourceCode.getText(node);
        functions.push({
          name,
          sourceCode,
          node,
        });
      },
      "Program:exit": () => {
        console.log("Call GenAI API");
        console.log(
          JSON.stringify(
            functions.map(({ name, sourceCode }) => ({ name, sourceCode })),
          ),
        );
        for (let fn of functions) {
          const rating = Math.floor(Math.random() * 10);
          const nameSuggestion = `${fn.name}V${rating}`;
          context.report({
            node: fn.node,
            messageId: "nonDescriptiveFunctionName",
            data: {
              name: fn.name,
              rating,
              nameSuggestion,
            },
            fix: (fixer) => {
              return fixer.replaceText(fn.node.id!, nameSuggestion);
            },
          });
        }
      },
    };
  },
};

export default descriptiveFunctionName;
