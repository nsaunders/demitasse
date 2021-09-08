import { FC, useState } from "react";
import { css } from "demitasse";
import cx from "classnames";
import { Button } from "./Button";
import { Input } from "./Input";

export const styles = /*#__PURE__*/css("example", {
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
  const [count, setCount] = useState(0);
  return (
    <div className={styles.container}>
      <Button
        className={styles.item}
        onClick={() => { setCount(count ? count - 1 : count); }}>
        -
      </Button>
      <Input
        className={cx(styles.item, styles.display)}
        value={count}
        onChange={() => {}} />
      <Button
        className={styles.item}
        onClick={() => { setCount(count + 1); }}>
        +
      </Button>
    </div>
  );
};
