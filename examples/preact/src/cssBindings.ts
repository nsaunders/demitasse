import { makeCSSBindings } from "demitasse";
export default makeCSSBindings(
  (identifier, { context }) => `${context}___${identifier}`,
);
