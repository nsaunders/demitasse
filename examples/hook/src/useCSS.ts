import type { cssBindings } from "demitasse";
import { makeCSSBindings } from "demitasse"; // eslint-disable-line no-duplicate-imports
import { useEffect, useMemo, useState } from "preact/hooks";
import { compile, serialize, stringify, middleware } from "stylis";

const useCSS: typeof cssBindings = css => {
  const [prefix] = useState(
    () =>
      `${Math.round(Number.MAX_SAFE_INTEGER * Math.random())
        .toString(36)
        .replace(/^[0-9]/, x => `x${x}`)}___`,
  );
  const scopedCSS = useMemo(
    () =>
      serialize(
        compile(css),
        middleware([
          (element, index, children, callback) => {
            switch (element.type) {
              case "rule":
                switch (typeof element.props) {
                  case "object":
                    element.props = element.props.map(prop =>
                      prop.replace(/[.#]/g, x => `${x}${prefix}`),
                    );
                    break;
                  case "string":
                    element.props = element.props.replace(
                      /[.#]/g,
                      x => `${x}${prefix}`,
                    );
                    break;
                }
                break;
              case "@keyframes":
                switch (typeof element.props) {
                  case "object":
                    element.value = `@keyframes ${prefix}${element.props[0]}`;
                    break;
                  case "string":
                    element.value = `@keyframes ${prefix}${element.props}`;
                    break;
                }
                break;
              case "decl":
                switch (element.props) {
                  case "animation":
                    (css.match(/@keyframes[^{]+/g) || [])
                      .map((x: string) => x.split(/\s+/).slice(1)[0])
                      .reduce(
                        (value: string, name: string) =>
                          value.replace(
                            new RegExp(`(^|\\s)(${name})(\\s|$)`),
                            (a, _b, c) => a.replace(c, `${prefix}${c}`),
                          ),
                        element.value,
                      );
                    break;
                  case "animation-name":
                    element.value = `${element.props}: ${prefix}${element.children}`;
                    break;
                }
                break;
            }
          },
          stringify,
        ]),
      ),
    [prefix, css],
  );
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = scopedCSS;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [scopedCSS]);
  return useMemo(
    () =>
      makeCSSBindings((name, { context }) => `${context}${name}`)(css, prefix),
    [css, prefix],
  );
};

export default useCSS;
