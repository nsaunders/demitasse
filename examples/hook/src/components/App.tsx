import { signal } from "@preact/signals";
import useCSS from "../useCSS";
import Button from "./Button";
import StarIcon from "./StarIcon";

const loading = signal(false);

export default function App() {
  const { classes } = useCSS(
    /*css*/ `
    .container {
      width: 200px;
      height: 200px;
      background: rgb(15,18,23);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  ` as const,
  );
  return (
    <div class={classes.container}>
      <Button
        loading={loading.value}
        icon={StarIcon}
        onClick={() => {
          loading.value = true;
          setTimeout(() => {
            (top || window).location.href =
              "https://github.com/nsaunders/demitasse";
          }, 1000);
        }}>
        Star
      </Button>
    </div>
  );
}
