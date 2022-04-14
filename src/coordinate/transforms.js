function transform(type, transformer) {
  transformer.type = () => type;
  return transformer;
}

/**
 * 平移变化
 * @param tx x 方向平移距离
 * @param ty y 方向平移距离
 * @returns {*}
 */
export function translate(tx = 0, ty = 0) {
  return transform('translate', ([px, py]) => [px + tx, py + ty]);
}

/**
 * 缩放变化
 * @param sx x 方向变化比
 * @param sy y 方向变化比
 * @returns {*}
 */
export function scale(sx = 1, sy = 1) {
  return transform('scale', ([px, py]) => [px * sx, py * sy]);
}

/**
 * 反射变化
 * @returns {*}
 */
export function reflect() {
  return transform('reflect', scale(-1, -1));
}

/**
 * 仅 x 方向反射变化
 * @returns {*}
 */
export function reflectX() {
  return transform('reflectX', scale(-1, 1));
}

/**
 * 仅 y 方向反射变化
 * @returns {*}
 */
export function reflectY() {
  return transform('reflectY', scale(1, -1));
}

/**
 * 转置变化
 * 转置变换就是交换一个点的两个维度，可以理解为按照 y = x 这条直线对称
 * @returns {*}
 */
export function transpose() {
  return transform('transpose', ([px, py]) => [py, px]);
}

/**
 * 笛卡尔坐标系 -> 极坐标变换
 * @returns {*}
 */
export function polar() {
  // 这里我们把点的第一个维度作为 theta
  // 第二个维度作为 radius
  return transform('polar', ([theta, radius]) => {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return [x, y];
  });
}
