//Replaces "-" with " " and capitalizes words. Could easily be made adaptable with a "remove" and "replace" parameter, which I did not implement for this demo.
export const stripText = (inp: string) => {
  let arr = inp.split("-");
  arr = arr.map((txt) => txt[0].toUpperCase() + txt.slice(1));
  return arr.join(" ");
};
