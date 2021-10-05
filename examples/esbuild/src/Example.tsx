import React, { FC, useState } from "react";
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

export const Example: FC<{ children?: undefined; }> = () => {
  const classes = toClassNames(styles);
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

export const exampleStyles = [
  ...buttonStyles,
  ...inputStyles,
  styles,
];
