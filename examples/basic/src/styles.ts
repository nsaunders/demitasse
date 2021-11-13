import { css as button } from "./Button";
import { css as example } from "./Example";
import { css as input } from "./Input";
import { sheets } from "demitasse";

export default sheets([
  ...button,
  ...example,
  ...input,
]);
