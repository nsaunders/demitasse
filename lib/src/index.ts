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
export function makeCSSBindings<Context>(
  f: (
    identifier: string,
    meta: { type: "class" | "id"; context: Context },
  ) => string,
) {
  /**
   * Extracts bindings from the provided CSS string.
   *
   * @param css - The CSS from which to extract CSS bindings
   *
   * @returns Class and ID bindings to the specified CSS
   */
  return function cssBindings<CSS extends string>(
    css: CSS,
    context: Context,
  ): {
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
  } {
    const classes = (css.match(/\.[A-Za-z][A-Za-z0-9_-]*/g) || [])
      .map(x => [
        x
          .substring(1)
          .replace(/^[A-Z]/, x => x.toLowerCase())
          .replace(/[^A-Za-z]([a-z])/g, x => x.toUpperCase())
          .replace(/[^A-Za-z0-9]/g, ""),
        f(x.substring(1), { context, type: "class" }),
      ])
      .reduce((xs, [k, v]) => ({ ...xs, [k]: v }), {});

    const ids = (css.match(/#[A-Za-z][A-Za-z0-9_-]*/g) || [])
      .map(x => [
        x
          .substring(1)
          .replace(/^[A-Z]/, x => x.toLowerCase())
          .replace(/[^A-Za-z]([a-z])/g, x => x.toUpperCase())
          .replace(/[^A-Za-z0-9]/g, ""),
        f(x.substring(1), { context, type: "id" }),
      ])
      .reduce((xs, [k, v]) => ({ ...xs, [k]: v }), {});

    return { classes, ids } as ReturnType<typeof cssBindings>;
  };
}

/**
 * Extracts bindings from the provided CSS string.
 *
 * @param css - The CSS from which to extract CSS bindings
 *
 * @returns Class and ID bindings to the specified CSS
 */
export function cssBindings<CSS extends string>(css: CSS) {
  return makeCSSBindings(x => x)(css, undefined);
}
