import expect from "expect";
import { cssBindings, makeCSSBindings } from "../src";

describe("cssBindings", () => {
  describe("given CSS input", () => {
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

    const { classes, ids } = cssBindings(css);

    it("gets class bindings", () => {
      expect(classes.headingLevel1).toEqual("heading-level1");
      expect(classes.red500Text).toEqual("red500text");
    });

    it("gets ID bindings", () => {
      expect(ids.myApp).toEqual("my-app");
      expect(ids.mainContainer).toEqual("main-container");
    });
  });

  describe("given extracted class names and IDs", () => {
    const css = "/*extracted*/ .foo .foo-bar #page_header";
    const bindings: any = cssBindings(css);

    it("gets class bindings", () => {
      expect(bindings.classes.foo).toEqual("foo");
      expect(bindings.classes.fooBar).toEqual("foo-bar");
    });

    it("gets ID bindings", () => {
      expect(bindings.ids.pageHeader).toEqual("page_header");
    });
  });
});

describe("makeCSSBindings", () => {
  const cssBindings = makeCSSBindings(
    (identifier, { context, type }) => `${type}___${context}___${identifier}`,
  );

  describe("cssBindings", () => {
    describe("given CSS input", () => {
      const css = `
        #foo {
          display: none;
        }

        .bar {
          visibility: hidden;
        }
      `;

      const context = "ctx";

      const { classes, ids } = cssBindings(css, context);

      it("gets class bindings per mapping function", () => {
        expect(classes.bar).toEqual("class___ctx___bar");
      });

      it("gets ID bindings per mapping function", () => {
        expect(ids.foo).toEqual("id___ctx___foo");
      });
    });

    describe("given extracted class names and IDs", () => {
      const css = "/*extracted*/ #foo .bar";

      const context = "ctx";

      const bindings: any = cssBindings(css, context);

      it("gets class bindings per mapping function", () => {
        expect(bindings.classes.bar).toEqual("class___ctx___bar");
      });

      it("gets ID bindings per mapping function", () => {
        expect(bindings.ids.foo).toEqual("id___ctx___foo");
      });
    });
  });
});
