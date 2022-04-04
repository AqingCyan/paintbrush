import { identity } from './utils';

/**
 * Identity 比例尺
 * 它的功能和它的名字一样：“恒等映射”，也就是将输入原封不动的返回。
 * @returns {function(*): *}
 */
export function createIdentity() {
  return (x) => identity(x);
}
