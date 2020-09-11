var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { $mobx } from "mobx";
/**
 * Moves an item from one position to another, checking that the indexes given are within bounds.
 *
 * @example
 * const source = observable([1, 2, 3])
 * moveItem(source, 0, 1)
 * console.log(source.map(x => x)) // [2, 1, 3]
 *
 * @export
 * @param {ObservableArray<T>} target
 * @param {number} fromIndex
 * @param {number} toIndex
 * @returns {ObservableArray<T>}
 */
export function moveItem(target, fromIndex, toIndex) {
    checkIndex(target, fromIndex);
    checkIndex(target, toIndex);
    if (fromIndex === toIndex) {
        return;
    }
    var oldItems = target[$mobx].values;
    var newItems;
    if (fromIndex < toIndex) {
        newItems = __spreadArrays(oldItems.slice(0, fromIndex), oldItems.slice(fromIndex + 1, toIndex + 1), [
            oldItems[fromIndex]
        ], oldItems.slice(toIndex + 1));
    }
    else {
        // toIndex < fromIndex
        newItems = __spreadArrays(oldItems.slice(0, toIndex), [
            oldItems[fromIndex]
        ], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
    }
    target.replace(newItems);
    return target;
}
/**
 * Checks whether the specified index is within bounds. Throws if not.
 *
 * @private
 * @param {ObservableArray<any>} target
 * @param {number }index
 */
function checkIndex(target, index) {
    if (index < 0) {
        throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
    }
    var length = target[$mobx].values.length;
    if (index >= length) {
        throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
    }
}
