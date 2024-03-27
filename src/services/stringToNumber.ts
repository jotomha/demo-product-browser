export const stringToNumber = (inp: string, def: number) => {
  if (isNaN(parseInt(inp))) return def;
  else return parseInt(inp);
};
