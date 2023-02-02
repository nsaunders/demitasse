import { ComponentType } from "preact";
import styled, { css, keyframes } from "styled-components";
import { useMemo } from "preact/hooks";
import LoadingIcon from "./LoadingIcon";

export const spin = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
}
`;

const Container = styled.button`
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

    &:hover {
      background: rgb(42,47,53);
      box-shadow: 0 0 0 1px rgb(128,137,148);
    }

    &:focus {
      border-radius: 0;
      box-shadow: 0 0 0 2px rgb(78,156,255);
    }
  }
`;

const IconSpin = styled.div<{ active: boolean }>`
  & > * {
    ${props =>
      props.active &&
      css`
        animation: ${spin} 0.75s infinite linear;
      `}
  }
`;

type ButtonProps = {
  children: string;
  icon?: ComponentType<{ class?: string }>;
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
    <Container onClick={onClick}>
      {Icon && (
        <IconSpin active={loading}>
          <Icon />
        </IconSpin>
      )}
      <div>{label}</div>
    </Container>
  );
}
