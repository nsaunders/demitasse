import { VFC, useState } from "react";
import { demi, cssExport } from "demitasse";
import cx from "classnames";
import { Button, css as buttonCSS } from "./Button";
import { Input, css as inputCSS } from "./Input";

const cssModuleId = "example";

const [exampleCSS, styles] = /*#__PURE__*/ demi(cssModuleId, {
  container: {
    display: "flex",
    margin: -2,
  },
  item: {
    margin: 2,
  },
  display: {
    textAlign: "center",
  },
});

export const Example: VFC<unknown> = () => {
  const { container, item, display } = styles;
  const [count, setCount] = useState(0);
  return (
    <div className={container}>
      <Button
        className={item}
        onClick={() => { setCount(count ? count - 1 : count); }}>
        -
      </Button>
      <Input
        className={cx(item, display)}
        value={count}
        onChange={() => {}} />
      <Button
        className={item}
        onClick={() => { setCount(count + 1); }}>
        +
      </Button>
    </div>
  );
};

export const css = /*#__PURE__*/ cssExport(cssModuleId, [
  ...buttonCSS,
  ...inputCSS,
  ...exampleCSS,
]);
