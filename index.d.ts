import { Properties } from "csstype";

interface Property extends Properties<number> {
  [key: string]: Property | string | number;
}

declare const css: (styles: Property) => string;
