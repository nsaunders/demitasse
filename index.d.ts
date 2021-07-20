import { Properties } from "csstype";

interface Property extends Properties<string | number> {
  [key: string]: Property | string | number;
}

declare const css: <T extends Property | Record<string, Property>>(
  styles: T
) => T extends Record<infer K, Property> ? Record<K, string> : string;
