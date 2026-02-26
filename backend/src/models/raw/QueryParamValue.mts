import type QueryString from "qs";

export type QueryParamValue =
  | string
  | QueryString.ParsedQs
  | (string | QueryString.ParsedQs)[]
  | undefined;
