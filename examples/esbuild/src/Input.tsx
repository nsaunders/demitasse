import React, { FC, HTMLProps } from "react";
import { css } from "demitasse";
import cx from "classnames";

export const styles = /*#__PURE__*/ css("input", {
  appearance: "none",
  outline: "none",
  paddingTop: 4,
  paddingRight: 8,
  paddingBottom: 4,
  paddingLeft: 8,
  fontFamily: "sans-serif",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#eee",
  borderRadius: 4,
  background: "#fff",
  color: "#333",
  "&:focus": {
    boxShadow: "0 0 0 2px #ccc",
  },
});

export const Input: FC<HTMLProps<HTMLInputElement>> = ({ className, ...props }) => (
  <input className={cx(className, styles)} type="text" {...props} />
);
