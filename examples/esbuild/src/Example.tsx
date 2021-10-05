import React, { VFC, useState } from "react";
import { css, toClassNames } from "demitasse";
import cx from "classnames";
import { Button, styles as buttonStyles } from "./Button";
import { Input, styles as inputStyles } from "./Input";

const exampleStyles = /*#__PURE__*/css("example", {
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
  const classes = toClassNames(exampleStyles);
  const [count, setCount] = useState(0);
  return (
    <div className={classes.container}>
      <Button
        className={classes.item}
        onClick={() => { setCount(count ? count - 1 : count); }}>
        -
      </Button>
      <Input
        className={cx(classes.item, classes.display)}
        value={count}
        onChange={() => {}} />
      <Button
        className={classes.item}
        onClick={() => { setCount(count + 1); }}>
        +
      </Button>
    </div>
  );
};

export const styles = [
  ...buttonStyles,
  ...inputStyles,
  exampleStyles,
];
