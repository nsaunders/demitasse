import { Properties } from "csstype";

interface Property extends Properties<string | number> {
  [key: string]: Property | string | number;
}

export type Styles = Record<string, Property>;

declare const css: (styles: Styles) => string;
