import { IComputedValueOptions } from "mobx";
/**
 * computedFn takes a function with an arbitrary amount of arguments,
 * and memoizes the output of the function based on the arguments passed in.
 *
 * computedFn(fn) returns a function with the very same signature. There is no limit on the amount of arguments
 * that is accepted. However, the amount of arguments must be constant and default arguments are not supported.
 *
 * By default the output of a function call will only be memoized as long as the
 * output is being observed.
 *
 * The function passes into `computedFn` should be pure, not be an action and only be relying on
 * observables.
 *
 * Setting `keepAlive` to `true` will cause the output to be forcefully cached forever.
 * Note that this might introduce memory leaks!
 *
 * @example
 * const store = observable({
    a: 1,
    b: 2,
    c: 3,
    m: computedFn(function(x) {
      return this.a * this.b * x
    })
  })

  const d = autorun(() => {
    // store.m(3) will be cached as long as this autorun is running
    console.log(store.m(3) * store.c)
  })
 *
 * @param fn
 * @param keepAliveOrOptions
 */
export declare function computedFn<T extends (...args: any[]) => any>(fn: T, keepAliveOrOptions?: IComputedValueOptions<ReturnType<T>> | boolean): T;
