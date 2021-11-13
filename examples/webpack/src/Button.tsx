import { FC, HTMLAttributes } from "react";
import { demi, cssExport } from "demitasse";
import cx from "classnames";

const cssModuleId = "button";

const [buttonCSS, styles] = /*#__PURE__*/ demi(cssModuleId, {
  appearance: "none",
  outline: "none",
  paddingTop: 4,
  paddingRight: 8,
  paddingBottom: 4,
  paddingLeft: 8,
  border: 0,
  borderRadius: 4,
  background: "#001f76",
  color: "#fff",
  fontFamily: "monospace",
  "&:focus": {
    boxShadow: "0 0 0 2px #ccc",
  },
});

export const Button: FC<HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button className={cx(className, styles)} {...props} />
);

export const css = /*#__PURE__*/ cssExport(cssModuleId, buttonCSS);
