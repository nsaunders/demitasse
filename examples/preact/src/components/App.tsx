import { signal } from "@preact/signals";
import cssBindings from "../cssBindings";
import Button from "./Button";
import StarIcon from "./StarIcon";

export const moduleId = "app";

export const css = /*css*/ `
  .container {
    width: 200px;
    height: 200px;
    background: rgb(15,18,23);
    display: flex;
    align-items: center;
    justify-content: center;
  }
` as const;

const { classes } = cssBindings(css, moduleId);

const loading = signal(false);

export default function App() {
  return (
    <div class={classes.container}>
      <Button
        loading={loading.value}
        icon={StarIcon}
        onClick={() => {
          loading.value = true;
          setTimeout(() => {
            location.href = "https://github.com/nsaunders/demitasse";
          }, 1000);
        }}>
        Star
      </Button>
    </div>
  );
}
