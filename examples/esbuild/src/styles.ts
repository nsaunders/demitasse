import { buttonStyles } from "./Button";
import { exampleStyles } from "./Example";
import { inputStyles } from "./Input";
import { toString } from "demitasse";

export default toString([
  ...buttonStyles,
  ...exampleStyles,
  ...inputStyles,
]);
