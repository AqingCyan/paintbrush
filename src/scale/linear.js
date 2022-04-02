import {
  normalize, tickStep, ticks, nice, floor, ceil,
} from './utils';
import { interpolateNumber } from './interpolate';

export function createLinear({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber,
}) {
  const scale = (x) => {
    const t = normalize(x, d0, d1);
    // 默认是使用线性的数值插值器
    // 如果是颜色可以使用颜色插入器
    return interpolate(t, r0, r1);
  };

  scale.ticks = (ticksCount) => ticks(d0, d1, ticksCount);
  scale.nice = (ticksCount) => {
    const step = tickStep(d0, d1, ticksCount);
    [d0, d1] = nice([d0, d1], {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step),
    });
  };

  return scale;
}
