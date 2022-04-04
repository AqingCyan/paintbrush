/**
 * 计算出输入在定义域的位置
 * @param value
 * @param start
 * @param stop
 * @returns {number}
 */
export function normalize(value, start, stop) {
  return (value - start) / (stop - start);
}

/**
 * 刻度间隔的值的生成
 * step0 是生成指定数量的刻度的间隔
 * step1 是最后生成的刻度的间隔
 * 我们希望 step1 满足两个条件：
 *   1. step1 = 10 ^ n * b (其中 b=1,2,5)
 *   2. step0 和 step1 的误差尽量的小
 * @param min
 * @param max
 * @param count
 * @returns {number}
 */
export function tickStep(min, max, count) {
  const e10 = Math.sqrt(50); // 7.07
  const e5 = Math.sqrt(10); // 3.16
  const e2 = Math.sqrt(2); // 1.41

  // 获得目标间隔 step0，设 step0 = 10 ^ m
  const step0 = Math.abs(max - min) / Math.max(0, count);
  // 获得 step1 的初始值 = 10 ^ n < step0，其中 n 为满足条件的最大整数
  let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10);
  // 计算 step1 和 step0 的误差，error = 10 ^ m / 10 ^ n = 10 ^ (m - n)
  const error = step0 / step1;
  // 根据当前的误差改变 step1 的值，从而减少误差
  // 1. 当 m - n >= 0.85 = log(e10) 的时候，step1 * 10
  // 可以减少log(10) = 1 的误差
  if (error >= e10) step1 *= 10;
  // 2. 当 0.85 > m - n >= 0.5 = log(e5) 的时候，step1 * 5
  // 可以减少 log(5) = 0.7 的误差
  else if (error >= e5) step1 *= 5;
  // 3. 当 0.5 > m - n >= 0.15 = log(e2) 的时候，step1 * 2
  // 那么可以减少 log(2) = 0.3 的误差
  else if (error >= e2) step1 *= 2;
  // 4. 当 0.15 > m - n > 0 的时候，step1 * 1
  return step1;
}

/**
 * 获取刻度
 * @param min
 * @param max
 * @param count
 */
export function ticks(min, max, count) {
  const step = tickStep(min, max, count);
  /*
  * 让 start 和 stop 都是 step 的整数倍
  * 这样生成的 ticks 都是 step 的整数倍
  * 可以让可读性更强
  * */
  const start = Math.ceil(min / step);
  const stop = Math.floor(max / step);
  const n = Math.ceil(stop - start + 1);

  // n 不一定等于 count，所以生成的 ticks 的数量可能和指定的不一样
  const values = new Array(n);
  for (let i = 0; i < n; i += 1) {
    values[i] = round((start + i) * step);
  }
  return values;
}

/**
 * 简单解决 js 的精读问题：0.1 + 0.2 !== 0.3
 * @param n
 * @returns {number}
 */
export function round(n) {
  return Math.round(n * 1e12) / 1e12;
}

/**
 * 数据定义域如果类似 [0.1, 9.9] 本身可读性不是很强
 * 但我们能根据刻度间隔去调整定义域的范围，使得最小值和最大值都是刻度间隔的整数倍
 * 目的：[0.1, 0.9] => [0, 10]
 * @param domain
 * @param interval
 * @returns {number[]}
 */
export function nice(domain, interval) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}

/**
 * 根据 base(step) 调整最小范围
 * @param n
 * @param base
 * @returns {number}
 */
export function ceil(n, base) {
  return base * Math.ceil(n / base);
}

/**
 * 根据 base(step) 调整最大范围
 * @param n
 * @param base
 * @returns {number}
 */
export function floor(n, base) {
  return base * Math.floor(n / base);
}

/**
 * 通过对象序列化结果简单判断两个对象是否相等
 * @param a
 * @param b
 * @returns {boolean}
 */
export function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * 计算 band scale 的宽度、步长、band scale 值域范围
 * @param domain
 * @param range
 * @param padding
 * @returns {{bandWidth: number, step: number, bandRange: unknown[]}}
 */
export function band({ domain, range, padding }) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (n + padding);
  const bandWidth = step * (1 - padding);
  const interval = step - bandWidth;
  const x = (_, i) => r0 + interval + step * i;
  return {
    step,
    bandWidth,
    bandRange: new Array(n).fill(0).map(x),
  };
}

/**
 * 恒等映射
 * @param x
 * @returns {*}
 */
export function identity(x) {
  return x;
}

/**
 * 等分方法，用于 threshold scale
 * @param array 原数组
 * @param x 份数
 * @param lo 最低节点
 * @param hi 最高节点
 * @param accessor
 * @returns {number}
 */
export function bisect(array, x, lo = 0, hi = array.length, accessor = identity) {
  let i = lo;
  let j = hi;
  while (i < j) {
    // eslint-disable-next-line no-bitwise
    const mid = (i + j) >>> 1;
    if (accessor(array[mid]) < x) {
      i = mid + 1;
    } else {
      j = mid;
    }
  }
  return i;
}

export function log(n, base) {
  return Math.log(n) / Math.log(base);
}
