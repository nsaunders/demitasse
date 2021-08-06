import { Properties } from "csstype";

type Length = string | number;

type Styles = Properties<Length> & Partial<{ [key: string]: Styles | string | number }>;

declare const css: <T extends Styles | Record<string, Styles>>(
  styles: T
) => T extends Record<infer K, Styles> ? Record<K, string> : string;
