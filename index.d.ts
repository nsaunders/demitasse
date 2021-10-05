import { Properties } from "csstype";

/**
 * A length value
 *
 * @remarks Unitless values default to pixels
 */
export type Length = string | number;

/**
 * A time value
 *
 * @remarks Unitless values default to milliseconds
 */
export type Time = string | number;

/**
 * A style rule
 *
 * @remarks Style rules support nested selectors, where `&` must be used within
 * the selector and are replaced with the parent selector.
 */
export type Rule = Properties<Length, Time> &
  Partial<{ [key: string]: Rule | string | number }>;

/**
 * A style rule or record of style rules
 */
export type Rules = Rule | Record<string, Rule>;

/**
 * @ignore
 */
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never;

/**
 * A group of style rules
 *
 * @typeParam R - Style rules
 */
declare type CSS<R> = {
  /**
   * A unique namespace for the rules
   * @internal
   */
  _groupName: string;

  /**
   * Style rules
   * @internal
   */
  _rules: R;

  /**
   * Debug flag
   * @internal
   */
  _debug: boolean;
}

/**
 * Creates CSS rules.
 *
 * @param groupName - A unique namespace used to generate class names
 * @param rules - A style rule or record of style rules
 * @param options - Additional options
 * @param options.debug - When `true`, group names and record keys are presented
 * in the generated class names.
 *
 * @typeParam R - A style rule or record of style rules
 *
 * @remarks Style rules support nested selectors, where `&` must be used within
 * the selector and are replaced with the parent selector.
 *
 * @returns CSS that is convertible to class names via {@link toClassNames} or
 * a style sheet via {@link toString}.
 */
export declare function css<R extends Rules>(groupName: string, rules: R, options?: { debug?: boolean; }): CSS<R>;

/**
 * Converts {@link CSS} to a class name or record of style names.
 *
 * @typeParam R - A style rule or record of style rules
 *
 * @param css - The CSS to convert to class names
 *
 * @returns - A class name or record of class names depending on the `css` argument
 */
export declare function toClassNames<R extends Rules>(css: CSS<R>): UnionToIntersection<R extends Record<infer K, Rule> ? K extends `${infer _}&${infer _}` ? string : Record<K, string> : string>;

/**
 * Converts {@link CSS} to a style sheet.
 *
 * @param css - The CSS value from which to generate the style sheet
 *
 * @remarks This is recommended for use at build time to generate a static style
 * sheet.
 *
 * @returns The generated style sheet
 */
export declare function toString<
  T extends CSS<Rules> | CSS<Rules>[] | Record<string, CSS<Rules> | CSS<Rules>[]>
>(css: T): T extends Record<infer K, CSS<unknown> | CSS<unknown>[]> ? Record<K, string> : string;
