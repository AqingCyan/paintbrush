/**
 * 创建 SVG 元素
 * @param type
 * @returns {*}
 */
export function createSVGElement(type) {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}

/**
 * 将 child 节点挂载到 parent 节点上面
 * @param parent
 * @param child
 */
export function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}
