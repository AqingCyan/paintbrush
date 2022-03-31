import { createContext } from './context';
import {
  line, circle, text, rect, path, ring,
} from './shape';
import {
  restore, save, scale, translate, rotate,
} from './transform';

export function createRenderer(width, height) {
  const context = createContext(width, height); // 创建上下文信息

  return {
    line: (options) => line(context, options), // 绘制线

    circle: (options) => circle(context, options), // 绘制圆

    text: (options) => text(context, options), // 绘制文本

    rect: (options) => rect(context, options), // 绘制矩形

    path: (options) => path(context, options), // 绘制路径

    ring: (options) => ring(context, options), // 绘制圆环

    restore: () => restore(context),

    save: () => save(context),

    scale: (...args) => scale(context, ...args),

    rotate: (...args) => rotate(context, ...args),

    translate: (...args) => translate(context, ...args),

    node: () => context.node,

    group: () => context.group,
  };
}