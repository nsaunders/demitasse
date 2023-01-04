type NormalizeWhitespaceChar<C extends string> = C extends
  | "\f"
  | "\n"
  | "\r"
  | "\t"
  | "\v"
  | "\u00A0"
  | "\u2028"
  | "\u2029"
  ? " "
  : C;

type NormalizeWhitespace<
  S extends string,
  Acc extends string = ""
> = S extends `${infer Head}${infer Tail}`
  ? NormalizeWhitespace<Tail, `${Acc}${NormalizeWhitespaceChar<Head>}`>
  : Acc;

type RemoveLeadingBraces<S extends string> = S extends `}${infer X}`
  ? RemoveLeadingBraces<X>
  : S;

type Statements<CSS extends string> = CSS extends `${infer Cond}{${infer More}`
  ? [
      RemoveLeadingBraces<Cond> extends `@${infer _}`
        ? []
        : RemoveLeadingBraces<Cond>,
      More extends `${infer A}}${infer B}`
        ? [...Statements<A>, ...Statements<B>]
        : Statements<More>
    ]
  : [];

type Flatten<T> = T extends []
  ? []
  : T extends [infer T0]
  ? [...Flatten<T0>]
  : T extends [infer T0, ...infer Ts]
  ? [...Flatten<T0>, ...Flatten<Ts>]
  : [T];

type Split<
  S extends string,
  D extends string,
  Acc extends string[] = []
> = S extends `${infer A}${D}${infer B}`
  ? Split<B, D, [...Acc, A]>
  : [...Acc, S];

type Join<
  S extends string[],
  D extends string,
  Acc extends string = ""
> = S extends []
  ? Acc
  : S extends [infer Head, ...infer Tail]
  ? Head extends string
    ? Tail extends string[]
      ? Join<Tail, D, `${Acc}${D}${Head}`>
      : never
    : never
  : never;

type Selectors<CSS extends string> = Join<
  Flatten<Statements<NormalizeWhitespace<CSS>>>,
  " "
>;

type IdentifierChar<S extends string> = S extends
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
  | "z"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "_"
  | "-"
  ? S
  : never;

type ExtractIdentifier<
  S extends string,
  Acc extends string = ""
> = S extends `${infer H}${infer T}`
  ? H extends IdentifierChar<H>
    ? ExtractIdentifier<T, `${Acc}${H}`>
    : Acc
  : Acc;

type IdentifierToCamelCase<
  Identifier extends string,
  NewWord extends boolean = false,
  Acc extends string = ""
> = Identifier extends `${"_" | "-"}${infer Tail}`
  ? IdentifierToCamelCase<Tail, true, Acc>
  : Identifier extends `${infer Head}${infer Tail}`
  ? IdentifierToCamelCase<
      Tail,
      Head extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
        ? true
        : false,
      `${Acc}${NewWord extends true ? Capitalize<Head> : Head}`
    >
  : Acc;

type Identifiers<Prefix extends "#" | ".", CSS extends string> = Exclude<
  Split<Selectors<CSS>, Prefix> extends (infer U)[]
    ? U extends string
      ? ExtractIdentifier<U>
      : never
    : never,
  ""
> extends infer Identifier
  ? Identifier extends string
    ? IdentifierToCamelCase<Identifier>
    : never
  : never;

type ClassNames<CSS extends string> = Identifiers<".", CSS>;

type Ids<CSS extends string> = Identifiers<"#", CSS>;

export function makeGetCSSBindings<Context>(f: (identifier: string, meta: { type: "class" | "id"; context: Context; }) => string) {
  return function getCSSBindings<CSS extends string>(css: CSS, context: Context): { classes: Record<ClassNames<CSS>, string>; ids: Record<Ids<CSS>, string>; } {
    const classes =
      (css.match(/\.([A-Za-z0-9_-]+)/g) || [])
        .map(x => [
          x.substring(1).replace(/[^A-Za-z]([a-z])/g, x => x.toUpperCase()).replace(/[^A-Za-z0-9]/g, ""),
          f(x.substring(1), { context, type: "class" }),
        ])
        .reduce((xs, [k, v]) => ({ ...xs, [k]: v }), {});

    const ids =
      (css.match(/#([A-Za-z0-9_-]+)/g) || [])
        .map(x => [
          x.substring(1).replace(/[^A-Za-z]([a-z])/g, x => x.toUpperCase()).replace(/[^A-Za-z0-9]/g, ""),
          f(x.substring(1), { context, type: "id" }),
        ])
        .reduce((xs, [k, v]) => ({ ...xs, [k]: v }), {});

    return { classes, ids } as ReturnType<typeof getCSSBindings>;
  };
}

export const getCSSBindings = makeGetCSSBindings(x => x);
