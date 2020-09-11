/**
 * Returns the current date time as epoch number.
 * The date time is read from an observable which is updated automatically after the given interval.
 * So basically it treats time as an observable.
 *
 * The function takes an interval as parameter, which indicates how often `now()` will return a new value.
 * If no interval is given, it will update each second. If "frame" is specified, it will update each time a
 * `requestAnimationFrame` is available.
 *
 * Multiple clocks with the same interval will automatically be synchronized.
 *
 * Countdown example: https://jsfiddle.net/mweststrate/na0qdmkw/
 *
 * @example
 *
 * const start = Date.now()
 *
 * autorun(() => {
 *   console.log("Seconds elapsed: ", (mobxUtils.now() - start) / 1000)
 * })
 *
 *
 * @export
 * @param {(number | "frame")} [interval=1000] interval in milliseconds about how often the interval should update
 * @returns
 */
export declare function now(interval?: number | "frame"): number;
