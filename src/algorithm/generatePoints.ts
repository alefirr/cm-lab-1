/**
 * Generates a sequence of evenly spaced points on the given interval
 *
 * @param start Dots start point
 * @param end Dots end point
 * @param count Total number of dots
 * @returns Array with evenly spaced dots
 */
export const generatePoints = (start: number, end: number, count: number) => {
  const step = (end - start) / (count - 1);
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(start + i * step);
  }
  return result;
};
