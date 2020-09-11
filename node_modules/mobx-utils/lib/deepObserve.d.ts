import { IObjectDidChange, IArrayChange, IArraySplice, IMapDidChange } from "mobx";
import { IDisposer } from "./utils";
declare type IChange = IObjectDidChange | IArrayChange | IArraySplice | IMapDidChange;
/**
 * Given an object, deeply observes the given object.
 * It is like `observe` from mobx, but applied recursively, including all future children.
 *
 * Note that the given object cannot ever contain cycles and should be a tree.
 *
 * As benefit: path and root will be provided in the callback, so the signature of the listener is
 * (change, path, root) => void
 *
 * The returned disposer can be invoked to clean up the listener
 *
 * deepObserve cannot be used on computed values.
 *
 * @example
 * const disposer = deepObserve(target, (change, path) => {
 *    console.dir(change)
 * })
 */
export declare function deepObserve<T = any>(target: T, listener: (change: IChange, path: string, root: T) => void): IDisposer;
export {};
