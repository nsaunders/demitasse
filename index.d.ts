import { Properties } from "csstype";

type Length = string | number;

type Styles = Properties<Length> &
  Partial<{ [key: string]: Styles | string | number }>;

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never;

declare const css: <T extends Styles | Record<string, Styles>>(
  groupName: string,
  styles: T
) => UnionToIntersection<
  T extends Record<infer K, Styles>
    ? K extends `${infer _}&${infer _}`
      ? string
      : Record<K, string>
    : string
>;
