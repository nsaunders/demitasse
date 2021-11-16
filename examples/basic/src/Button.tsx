import { FC, HTMLAttributes } from "react";
import { cssRules, cssExport } from "demitasse";
import cx from "classnames";

const cssModuleId = "button";

const [_css, styles] = /*#__PURE__*/ cssRules(cssModuleId, {
  appearance: "none",
  outline: "none",
  paddingTop: 4,
  paddingRight: 8,
  paddingBottom: 4,
  paddingLeft: 8,
  border: 0,
  borderRadius: 4,
  background: "#eee",
  color: "#333",
  fontFamily: "monospace",
  "&:focus": {
    boxShadow: "0 0 0 2px #ccc",
  },
});

export const Button: FC<HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button className={cx(className, styles)} {...props} />
);

export const css = /*#__PURE__*/ cssExport(cssModuleId, _css);
