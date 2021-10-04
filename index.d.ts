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
 * A style rule or map of style rules.
 *
 * @remarks Style rules support nested selectors, where `&` must be used within
 * the selector and are replaced with the parent selector.
 */
export type Rules = Properties<Length, Time> &
  Partial<{ [key: string]: Rules | string | number }>;

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
export declare function css<R extends Record<string, Rules> | Rules>(groupName: string, rules: R, options?: { debug?: boolean; }): CSS<R>;

/**
 * Converts {@link CSS} to a class name or map thereof.
 *
 * @typeParam S - The subtype of CSS value, used to determine whether the return
 * type is a string or a map
 *
 * @param css - The CSS value to convert to class names
 *
 * @returns - A class name or map of class names depending on the `css` argument
 */
export declare function toClassNames<S extends CSS<Record<string, Rules> | Rules>>(css: S): S extends CSS<infer R> ? UnionToIntersection<R extends Record<infer K, Rules> ? K extends `${infer _}&${infer _}` ? string : Record<K, string> : string> : string;

/**
 * Converts {@link CSS} to a style sheet.
 * 
 * @param css - The CSS value from which to generate the style sheet
 *
 * @remarks This is recommended for use at build time to generate a static CSS
 * style sheet that must be shipped alongside the JavaScript bundle.
 *
 * @returns The generated style sheet
 */
export declare function toString<R>(css: CSS<R>): string;
