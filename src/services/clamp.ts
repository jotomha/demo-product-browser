//Clamps "clamp" between low & high. returns low if clamp < low, high clamp > high, clamp otherwise
export const clamp = (low: number, high: number, clamp: number) => {
  return clamp < low ? low : clamp > high ? high : clamp;
};
