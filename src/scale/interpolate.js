/**
 * 线性的数值插值器
 * @param t
 * @param start
 * @param stop
 * @returns {number}
 */
export function interpolateNumber(t, start, stop) {
  // start - start * t + stop * t === (stop - start) * t + start
  return start * (1 - t) + stop * t;
}

/**
 * 颜色插值器
 * @param t
 * @param start
 * @param stop
 * @returns {string}
 */
export function interpolateColor(t, start, stop) {
  const r = interpolateNumber(t, start[0], stop[0]);
  const g = interpolateNumber(t, start[1], stop[1]);
  const b = interpolateNumber(t, start[2], stop[2]);
  return `rgb(${r}, ${g}, ${b})`;
}
