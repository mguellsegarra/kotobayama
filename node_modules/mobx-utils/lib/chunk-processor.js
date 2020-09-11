import { isAction, autorun, action, isObservableArray, runInAction } from "mobx";
/**
 * `chunkProcessor` takes an observable array, observes it and calls `processor`
 * once for a chunk of items added to the observable array, optionally deboucing the action.
 * The maximum chunk size can be limited by number.
 * This allows both, splitting larger into smaller chunks or (when debounced) combining smaller
 * chunks and/or single items into reasonable chunks of work.
 *
 * @example
 * const trackedActions = observable([])
 * const stop = chunkProcessor(trackedActions, chunkOfMax10Items => {
 *   sendTrackedActionsToServer(chunkOfMax10Items);
 * }, 100, 10)
 *
 * // usage:
 * trackedActions.push("scrolled")
 * trackedActions.push("hoveredButton")
 * // when both pushes happen within 100ms, there will be only one call to server
 *
 * @param {T[]} observableArray observable array instance to track
 * @param {(item: T[]) => void} processor action to call per item
 * @param {number} [debounce=0] optional debounce time in ms. With debounce 0 the processor will run synchronously
 * @param {number} [maxChunkSize=0] optionally do not call on full array but smaller chunks. With 0 it will process the full array.
 * @returns {IDisposer} stops the processor
 */
export function chunkProcessor(observableArray, processor, debounce, maxChunkSize) {
    if (debounce === void 0) { debounce = 0; }
    if (maxChunkSize === void 0) { maxChunkSize = 0; }
    if (!isObservableArray(observableArray))
        throw new Error("Expected observable array as first argument");
    if (!isAction(processor))
        processor = action("chunkProcessor", processor);
    var runner = function () {
        var _loop_1 = function () {
            var chunkSize = maxChunkSize === 0
                ? observableArray.length
                : Math.min(observableArray.length, maxChunkSize);
            // construct a final set
            var items = observableArray.slice(0, chunkSize);
            // clear the slice for next iteration
            runInAction(function () { return observableArray.splice(0, chunkSize); });
            // fire processor
            processor(items);
        };
        while (observableArray.length > 0) {
            _loop_1();
        }
    };
    if (debounce > 0)
        return autorun(runner, { delay: debounce });
    else
        return autorun(runner);
}
