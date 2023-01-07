import expect from "expect";
import { getCSSBindings, makeGetCSSBindings } from "../src";

describe("getCSSBindings", () => {
  const css = `
    #my-app {
      font-size: 16px;
    }

    #main-container {
      position: fixed;
    }

    .heading-level1 {
      font-size: 72px;
    }

    .red500text {
      color: var(--red500);
    }
  ` as const;

  const { classes, ids } = getCSSBindings(css);

  it("gets class bindings", () => {
    expect(classes.headingLevel1).toEqual("heading-level1");
    expect(classes.red500Text).toEqual("red500text");
  });

  it("gets ID bindings", () => {
    expect(ids.myApp).toEqual("my-app");
    expect(ids.mainContainer).toEqual("main-container");
  });
});

describe("makeGetCSSBindings", () => {
  const getCSSBindings = makeGetCSSBindings(
    (identifier, { context, type }) => `${type}___${context}___${identifier}`,
  );

  describe("getCSSBindings", () => {
    const css = `
      #foo {
        display: none;
      }

      .bar {
        visibility: hidden;
      }
    `;

    const context = "ctx";

    const { classes, ids } = getCSSBindings(css, context);

    it("gets class bindings per mapping function", () => {
      expect(classes.bar).toEqual("class___ctx___bar");
    });

    it("gets ID bindings per mapping function", () => {
      expect(ids.foo).toEqual("id___ctx___foo");
    });
  });
});