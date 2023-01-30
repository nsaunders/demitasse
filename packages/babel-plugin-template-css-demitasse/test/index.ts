import expect from "expect";
import { transformAsync } from "@babel/core";
import plugin from "../src";

describe("plugin", () => {
  it("transforms template CSS into a list of class names and IDs", async () => {
    const result = await transformAsync(
      `
      const css = /*css*/\`
        .foo {
          background: black;
        }

        .text-light {
          color: \${"white"};
        }

        #pageHeader {
          width: 100%;
        }
      \`;
    `,
      { plugins: [plugin] },
    );
    expect(result?.code).toEqual(
      'const css = /*css*/"/*extracted*/ .foo .text-light #pageHeader";',
    );
  });

  it("allows extra whitespace in tag comment", async () => {
    const result = await transformAsync(
      `
      const css = /*   css  */\`
        .foo {
          background: black;
        }
      \`;
    `,
      { plugins: [plugin] },
    );
    expect(result?.code).toEqual(
      'const css = /*   css  */"/*extracted*/ .foo";',
    );
  });

  it("matches tag comment case-insensitively", async () => {
    const result = await transformAsync(
      `
      const css = /*CSS*/\`
        .foo {
          background: black;
        }
      \`;
    `,
      { plugins: [plugin] },
    );
    expect(result?.code).toEqual('const css = /*CSS*/"/*extracted*/ .foo";');
  });

  it("doesn't error if the string has no class names or IDs", async () => {
    const result = await transformAsync(
      `
      const css = /*css*/\`
        body {
          background: black;
        }
      \`;
    `,
      { plugins: [plugin] },
    );
    expect(result?.code).toEqual('const css = /*css*/"/*extracted*/ ";');
  });
});
