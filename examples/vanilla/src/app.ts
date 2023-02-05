import { cssBindings } from "demitasse";

export const css = /* css */ `
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(1turn);
    }
  }

  .container {
    width: 200px;
    height: 200px;
    background: rgb(15,18,23);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button {
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

  .button:hover {
    background: rgb(42,47,53);
    box-shadow: 0 0 0 1px rgb(128,137,148);
  }

  .button:focus {
    border-radius: 0;
    box-shadow: 0 0 0 2px rgb(78,156,255);
  }

  .button__icon--loading {
    animation: spin 0.75s infinite linear;
  }

  .button__label {
  }
` as const;

const { classes } = cssBindings(css);

const starDrawing =
  "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z";
const spinnerDrawing = "M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z";

export function render() {
  const host = document.createElement("div");
  document.body.appendChild(host);

  const buttonId = "button";
  const iconId = "icon";
  const pathId = "path";

  host.innerHTML = /* HTML */ ` <div class="${classes.container}">
    <button id=${buttonId} class="${classes.button}">
      <svg width="18" height="18" viewBox="0 0 24 24" id="${iconId}">
        <path id="${pathId}" fill="currentColor" d="${starDrawing}" />
      </svg>
      <div class="${classes.buttonLabel}">Star</div>
    </button>
  </div>`;

  document.getElementById(buttonId)?.addEventListener("click", () => {
    document.getElementById(iconId)?.classList.add(classes.buttonIconLoading);
    document.getElementById(pathId)?.setAttribute("d", spinnerDrawing);
    setTimeout(() => {
      (top || window).location.href = "https://github.com/nsaunders/demitasse";
    }, 1000);
  });
}
