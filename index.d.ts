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

export type Rule = Properties<Length, Time> &
  Partial<{ [key: string]: Rule | string | number }>;

export type Rules = Rule | Record<string, Rule>;

export type Options = {
  debug?: boolean;
};

type ExportStatus = "NotExported" | "Exported";

export type CSS<R extends ExportStatus = "NotExported"> = any[] & {
  _exportStatus: R;
};

export declare function demi<I extends Readonly<string>, R extends Rules>(
  moduleId: I extends "_common" ? never : I,
  rules: R,
  options?: Options
): [
  CSS,
  A.Compute<
    U.IntersectOf<
      R extends Record<infer K, Rule>
        ? K extends `${infer _}&${infer _}`
          ? string
          : Record<K, string>
        : string
    >
  >
];

export declare function cssExport<I extends Readonly<string>, R extends Rules>(
  sheetId: I extends "_common" ? never : I,
  rules: [string, R, Options][]
): CSS<"Exported">;

export declare function sheets(css: CSS<"Exported">): Record<string, string>;
