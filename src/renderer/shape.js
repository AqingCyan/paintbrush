import { applyAttributes, createSVGElement, mount } from './utils';

/**
 * 根据类型绘制图形
 * 在 SVG 环境下我们绘制一个基本图形需要三步：创建元素、设置属性和挂载元素
 * 因为绘制不同的图形只是在创建元素阶段指定不同的元素类型，所以我们把上面三步封装成一个通用的 shape 函数
 * @param type
 * @param context
 * @param attributes
 * @returns {*}
 */
export function shape(type, context, attributes) {
  const { group } = context;
  const el = createSVGElement(type);
  applyAttributes(el, attributes);

  mount(group, el);
  return el;
}

/**
 * 基于 shape 拓展出绘制线形图形
 * @param context
 * @param attributes
 * @returns {*}
 */
export function line(context, attributes) {
  return shape('line', context, attributes);
}

/**
 * 绘制矩形图形
 * @param context
 * @param attributes
 * @returns {*}
 */
export function rect(context, attributes) {
  const {
    width, height, x, y,
  } = attributes;

  /**
   * rect 不支持 width 和 height 是负数，下面这种情况将绘制不出来
   * <rect width="-60" height="-60" x="100" y="100" /> ❌
   * 为了使其支持负数的 width 和 height，我们转换成如下的形式
   * <rect width="60" height="60" x="40" y="40" /> ✅
   */
  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height,
  });
}

/**
 * 绘制圆形图形
 * @param context
 * @param attributes
 * @returns {*}
 */
export function circle(context, attributes) {
  return shape('circle', context, attributes);
}

/**
 * 绘制文本
 * text 元素是将展示内容放在标签内部，而不是作为标签的属性
 * <text text='content' /> ❌
 * <text>content</text> ✅
 * @param context
 * @param attributes
 * @returns {*}
 */
export function text(context, attributes) {
  const { text, ...rest } = attributes;
  const textElement = shape('text', context, rest);
  textElement.textContent = text; // 通过 textContent 设置标签内的内容
  return textElement;
}

/**
 * 绘制路径图形
 * @param context
 * @param attributes
 */
export function path(context, attributes) {
  const { d } = attributes;

  /**
   * path 的属性 d （路径）是一个字符串，拼接起来比较麻烦，这里我们通过数组去生成
   * [
   *   ['M', 10, 10],
   *   ['L', 100, 100],
   *   ['L', 100, 10],
   *   ['Z'],
   * ];
   * 上面的二维数组会被转换成如下的字符串
   * 'M 10 10 L 100 100 L 100 10 Z'
   */
  return shape('path', context, { ...attributes, d: d.flat().join(' ') });
}

/**
 * 绘制圆环
 * 将用三个圆去模拟一个圆环，它们的填充色都是透明的，其中两个圆的边框去模拟圆环的边框，用一个圆的边框去模拟圆环本身。
 * @param context
 * @param attributes
 * @returns {*[]}
 */
export function ring(context, attributes) {
  // r1 是内圆的半径，r2 是外圆的半径
  const {
    cx, cy, r1, r2, ...styles
  } = attributes;
  const { stroke, strokeWidth, fill } = styles;
  const defaultStrokeWidth = 1;
  const innerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r1,
  });
  const ring = circle(context, {
    ...styles,
    strokeWidth: r2 - r1 - (strokeWidth || defaultStrokeWidth),
    stroke: fill,
    fill: 'transparent',
    cx,
    cy,
    r: (r1 + r2) / 2,
  });
  const outerStroke = circle(context, {
    fill: 'transparent',
    stroke: stroke || fill,
    strokeWidth,
    cx,
    cy,
    r: r2,
  });
  return [innerStroke, ring, outerStroke];
}
