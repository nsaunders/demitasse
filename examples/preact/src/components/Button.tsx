import { ComponentType } from "preact";
import { useMemo } from "preact/hooks";
import cx from "clsx";
import cssBindings from "../cssBindings";
import LoadingIcon from "./LoadingIcon";

export const moduleId = "button";

export const css = /*css*/ `
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(1turn);
    }
  }

  .container {
    appearance: none;
    outline: none;
    border: none;
    box-shadow: 0 0 0 1px rgb(51,56,62);
    background: rgb(30,34,40);
    color: rgb(194,203,212);
    border-radius:6px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding: 4px 12px;
    cursor: pointer;
  }

  .container:hover {
    background: rgb(42,47,53);
    box-shadow: 0 0 0 1px rgb(128,137,148);
  }

  .container:focus {
    border-radius: 0;
    box-shadow: 0 0 0 2px rgb(78,156,255);
  }

  .icon-loading {
    animation: spin 0.75s infinite linear;
  }

  .label {
  }
` as const;

const { classes } = cssBindings(css, moduleId);

type ButtonProps = {
  children: string;
  icon?: ComponentType<{ class: string }>;
  loading?: boolean;
  onClick: (e: MouseEvent) => void;
};

export default function Button({
  children: label,
  icon,
  loading,
  onClick = () => {
    /*noop*/
  },
}: ButtonProps) {
  const Icon = useMemo(() => (loading ? LoadingIcon : icon), [icon, loading]);
  return (
    <button class={classes.container} onClick={onClick}>
      {Icon && <Icon class={cx(loading && classes.iconLoading)} />}
      <div class={classes.label}>{label}</div>
    </button>
  );
}
