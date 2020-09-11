import { isAction, autorun, action, isObservableArray, runInAction } from "mobx";
/**
 * `queueProcessor` takes an observable array, observes it and calls `processor`
 * once for each item added to the observable array, optionally debouncing the action
 *
 * @example
 * const pendingNotifications = observable([])
 * const stop = queueProcessor(pendingNotifications, msg => {
 *   // show Desktop notification
 *   new Notification(msg);
 * })
 *
 * // usage:
 * pendingNotifications.push("test!")
 *
 * @param {T[]} observableArray observable array instance to track
 * @param {(item: T) => void} processor action to call per item
 * @param {number} [debounce=0] optional debounce time in ms. With debounce 0 the processor will run synchronously
 * @returns {IDisposer} stops the processor
 */
export function queueProcessor(observableArray, processor, debounce) {
    if (debounce === void 0) { debounce = 0; }
    if (!isObservableArray(observableArray))
        throw new Error("Expected observable array as first argument");
    if (!isAction(processor))
        processor = action("queueProcessor", processor);
    var runner = function () {
        // construct a final set
        var items = observableArray.slice(0);
        // clear the queue for next iteration
        runInAction(function () { return observableArray.splice(0); });
        // fire processor
        items.forEach(processor);
    };
    if (debounce > 0)
        return autorun(runner, { delay: debounce });
    else
        return autorun(runner);
}
