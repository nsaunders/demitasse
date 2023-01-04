import { makeGetCSSBindings } from "demitasse";
export default makeGetCSSBindings(
  (identifier, { context }) => `${context}___${identifier}`,
);
