import queryString from "query-string";

export const buildQueryString = params => queryString.stringify(
  params,
  {
    skipEmptyString: true,
    arrayFormat: "comma",
  },
);

export const parseQueryString = string => queryString.parse(string);
