import { createSVGElement, mount } from './utils';

/**
 * 创建上下文
 * 对于渲染引擎来说，上下文（Context）主要用于保存一些绘制或者其他功能需要的全局的信息，比如挂载画布的容器，当前的填充颜色，边框粗细等。
 * @param width
 * @param height
 * @returns {{node: *, group: *}}
 */
export function createContext(width, height) {
  /* 创建画布 svg 节点，并且设置宽高 */
  const svg = createSVGElement('svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  /* 创建挂载 g 节点，并且把该 g 节点挂载到 svg 节点上 */
  const g = createSVGElement('g');
  mount(svg, g);

  return { node: svg, group: g };
}
