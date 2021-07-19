import { Properties } from "csstype";

interface Property extends Properties<string | number> {
  [key: string]: Property | string | number;
}

declare const css: (styles: Property) => string;
