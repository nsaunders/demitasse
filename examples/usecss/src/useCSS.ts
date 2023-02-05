import type { cssBindings } from "demitasse";
import { makeCSSBindings } from "demitasse"; // eslint-disable-line no-duplicate-imports
import { useEffect, useMemo, useState } from "preact/hooks";
import postcss from "postcss";
import prefixer from "postcss-prefixer";
import prefixKeyframe from "postcss-prefix-keyframe";

const useCSS: typeof cssBindings = css => {
  const [prefix] = useState(
    () =>
      `${Math.round(Number.MAX_SAFE_INTEGER * Math.random())
        .toString(36)
        .replace(/^[0-9]/, x => `x${x}`)}___`,
  );
  const scopedCSS = useMemo(() => {
    return postcss(
      [prefixer, prefixKeyframe].map(plugin => plugin({ prefix })),
    ).process(css).css;
  }, [prefix, css]);
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
