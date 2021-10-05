import { VFC, useState } from "react";
import { css, toClassNames } from "demitasse";
import cx from "classnames";
import { Button, buttonStyles } from "./Button";
import { Input, inputStyles } from "./Input";

const styles = /*#__PURE__*/css("example", {
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
  const { container, display, item } = toClassNames(styles);
  const [count, setCount] = useState(0);
  return (
    <div className={container}>
      <Button
        className={styles.item}
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

export const exampleStyles = [
  ...buttonStyles,
  ...inputStyles,
  styles,
];
