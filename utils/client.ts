export const getCompactNumberFormat = (value: number) =>
  Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
