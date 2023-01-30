import type { NodePath } from "@babel/core";
import { isTemplateLiteral } from "@babel/types";

export default function () {
  return {
    visitor: {
      TemplateLiteral(path: NodePath) {
        if (isTemplateLiteral(path.node)) {
          const { leadingComments } = path.node;
          if (leadingComments) {
            const isCSS =
              leadingComments[leadingComments.length - 1].value
                .trim()
                .toLowerCase() === "css";
            if (isCSS) {
              const names = path.node.quasis.flatMap(
                ({ value }) =>
                  value.raw.match(/[.#][A-Za-z_-][A-Za-z0-9_-]*/g) || [],
              );
              path.replaceWithSourceString(
                `"/*extracted*/ ${names.join(" ")}"`,
              );
            }
          }
        }
      },
    },
  };
}
