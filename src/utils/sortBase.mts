import type { QueryParamValue } from "../models/raw/QueryParamValue.mjs";

export const sortList = <T,>(
  list: T[],
  field: keyof T,
  sort: QueryParamValue
): T[] => {
  const direction = sort === "asc" ? 1 : -1;

  return [...list].sort(
    (a, b) => (+a[field] - +b[field]) * direction,
  );
};
