import { Properties } from "csstype";
import { A, U } from "ts-toolbelt";

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
 * The type of a rule
 */
export type Rule = Properties<Length, Time> &
  Partial<{ [key: string]: Rule | string | number }>;

/**
 * The type of either a rule or a record of rules
 */
export type Rules = Rule | Record<string, Rule>;

/**
 * Options for creating CSS via {@link cssRules}
 *
 * @property debug - Debug mode flag; when enabled, class names are
 * significantly longer but can be used to identify CSS rules more easily.
 */
export type Options = {
  debug?: boolean;
};

/**
 * A structure created {@link cssRules} that contains CSS rules
 *
 * @typeParam S - Identifies whether the CSS has been exported, useful for
 * determining to which style sheet generated CSS should be written
 */
export type CSS<S extends "NotExported" | "Exported"> = A.Type<
  [string, Rules, Options],
  S
>;

/**
 * Constructs CSS rules.
 * 
 * @typeParam I - CSS module identifier
 * @typeParam R - Rule structure
 *
 * @param moduleId - CSS module identifier
 * @param rules - CSS rules
 * @param options - Additional options
 *
 * @returns A tuple/pair containing the CSS and a generated class name (or
 * record thereof, when multiple rules are defined)
 */
export declare function cssRules<I extends Readonly<string>, R extends Rules>(
  moduleId: I extends "_common" ? never : I,
  rules: R,
  options?: Options
): [
  CSS<"NotExported">[],
  A.Compute<
    U.IntersectOf<
      R extends Record<infer K, Rule>
        ? K extends `${infer _}&${infer _}`
          ? string
          : K extends `@${infer _}`
          ? string
          : Record<K, string>
        : string
    >
  >
];

/**
 * @deprecated
 */
export const demi: typeof cssRules;

/**
 * Prepares CSS rules for conversion into style sheets.
 *
 * @typeParam I - CSS module identifier
 *
 * @param moduleId - CSS module identifier
 * @param rules - The CSS that should be included in this module (including
 * dependencies)
 *
 * @returns CSS that is ready to convert into style sheets
 */
export declare function cssExport<I extends Readonly<string>>(
  moduleId: I extends "_common" ? never : I,
  rules: CSS<"NotExported" | "Exported">[]
): CSS<"Exported">[];

/**
 * Generates style sheets.
 *
 * @param css - The exported CSS to convert into style sheets
 *
 * @returns A record of style sheets, where each key is a module identifier
 * (filename without the ".css" extension) and each corresponding value is
 * static CSS content
 */
export declare function sheets(css: CSS<"Exported">[]): Record<string, string>;
