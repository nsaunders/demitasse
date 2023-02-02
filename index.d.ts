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

type AlphaChars =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

type NumChars = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type NameChars = AlphaChars | NumChars | "_" | "-";

type ExtractName<
  S extends string,
  Acc extends string = "",
> = S extends `${infer Head}${infer Tail}`
  ? Head extends NameChars
    ? ExtractName<Tail, `${Acc}${Head}`>
    : [Acc, S]
  : [Acc, S];

/*eslint-disable @typescript-eslint/no-unused-vars*/
type Names<
  Prefix extends string,
  CSS extends string,
  Acc extends string[] = [],
> = CSS extends `${infer _}${Prefix}${infer Rest}`
  ? Rest extends `${infer BeforeOpen}{${infer _}`
    ? BeforeOpen extends `${infer _};${infer _}`
      ? Names<Prefix, Rest, Acc>
      : BeforeOpen extends `${AlphaChars}${infer _}`
      ? ExtractName<BeforeOpen> extends [infer Name, infer _]
        ? Name extends string
          ? Names<Prefix, Rest, [...Acc, Name]>
          : never
        : never
      : Names<Prefix, Rest, Acc>
    : Names<Prefix, Rest, Acc>
  : Acc;
/*eslint-enable @typescript-eslint/no-unused-vars*/

type FieldName<
  S extends string,
  Acc extends string = "",
  NewWord extends boolean = false,
> = S extends `${infer Head}${infer Tail}`
  ? Head extends AlphaChars
    ? FieldName<
        Tail,
        `${Acc}${NewWord extends true
          ? Uppercase<Head>
          : Acc extends ""
          ? Lowercase<Head>
          : Head}`,
        false
      >
    : Head extends NumChars
    ? FieldName<Tail, `${Acc}${Head}`, true>
    : FieldName<Tail, Acc, true>
  : Acc;

/**
 * Creates a custom version of {@link cssBindings} which allows class name
 * and ID values to be mapped in some way, for example to match a build-time
 * scoping mechanism.
 *
 * @param f - The mapping function to apply to class names and IDs
 *
 * @returns A version of {@link cssBindings} that applies the specified
 * mapping function
 */
declare function makeCSSBindings<Context>(
  f: (name: string, meta: { type: "class" | "id"; context: Context }) => string,
): <CSS extends string>(css: CSS, context: Context) => {
  /** A map of class names referenced within the specified CSS */
  classes: Record<
    Names<".", CSS>[number] extends infer Name
      ? Name extends string
        ? FieldName<Name>
        : never
      : never,
    string
  >;

  /** A map of IDs referenced within the specified CSS */
  ids: Record<
    Names<"#", CSS>[number] extends infer Name
      ? Name extends string
        ? FieldName<Name>
        : never
      : never,
    string
  >;
};

/**
 * Extracts bindings from the provided CSS string.
 *
 * @param css - The CSS from which to extract CSS bindings
 *
 * @returns Class and ID bindings to the specified CSS
 */
declare function cssBindings<CSS extends string>(css: CSS): {
  /** A map of class names referenced within the specified CSS */
  classes: Record<
    Names<".", CSS>[number] extends infer Name
      ? Name extends string
        ? FieldName<Name>
        : never
      : never,
    string
  >;

  /** A map of IDs referenced within the specified CSS */
  ids: Record<
    Names<"#", CSS>[number] extends infer Name
      ? Name extends string
        ? FieldName<Name>
        : never
      : never,
    string
  >;
};

export { makeCSSBindings, cssBindings }