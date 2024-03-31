//Parses an integer from provided string, and returns default if input was not a number.
export const stringToNumber = (inp: string, def: number) => {
  if (isNaN(parseInt(inp))) return def;
  else return parseInt(inp);
};
