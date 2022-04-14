/**
 * 函数柯里化
 * @param fn
 * @returns {(function(...[*]): (*))|*}
 */
export function curry(fn) {
  const arity = fn.length;
  return function curried(...args) {
    // 如果没有传入参数就把参数列表设置为 [undefined]
    const newArgs = args.length === 0 ? [undefined] : args;
    if (newArgs.length >= arity) return fn(...newArgs);
    return curried.bind(null, ...newArgs);
  };
}
