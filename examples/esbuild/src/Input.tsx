import React, { FC, HTMLProps } from "react";
import { demi, cssExport } from "demitasse";
import cx from "classnames";

const cssModuleId = "input";

const [inputCSS, styles] = /*#__PURE__*/ demi(cssModuleId, {
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

export const css = /*#__PURE__*/ cssExport(cssModuleId, inputCSS);
