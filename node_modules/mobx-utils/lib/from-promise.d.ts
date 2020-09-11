export declare type PromiseState = "pending" | "fulfilled" | "rejected";
export declare const PENDING = "pending";
export declare const FULFILLED = "fulfilled";
export declare const REJECTED = "rejected";
declare type CaseHandlers<U, T> = {
    pending?: (t?: T) => U;
    fulfilled?: (t: T) => U;
    rejected?: (e: any) => U;
};
export interface IBasePromiseBasedObservable<T> extends PromiseLike<T> {
    isPromiseBasedObservable: true;
    case<U>(handlers: CaseHandlers<U, T>, defaultFulfilled?: boolean): U;
}
export declare type IPendingPromise = {
    readonly state: "pending";
    readonly value: any;
};
export declare type IFulfilledPromise<T> = {
    readonly state: "fulfilled";
    readonly value: T;
};
export declare type IRejectedPromise = {
    readonly state: "rejected";
    readonly value: any;
};
export declare type IPromiseBasedObservable<T> = IBasePromiseBasedObservable<T> & (IPendingPromise | IFulfilledPromise<T> | IRejectedPromise);
/**
 * `fromPromise` takes a Promise, extends it with 2 observable properties that track
 * the status of the promise and returns it. The returned object has the following observable properties:
 *  - `value`: either the initial value, the value the Promise resolved to, or the value the Promise was rejected with. use `.state` if you need to be able to tell the difference.
 *  - `state`: one of `"pending"`, `"fulfilled"` or `"rejected"`
 *
 * And the following methods:
 * - `case({fulfilled, rejected, pending})`: maps over the result using the provided handlers, or returns `undefined` if a handler isn't available for the current promise state.
 * - `then((value: TValue) => TResult1 | PromiseLike<TResult1>, [(rejectReason: any) => any])`: chains additional handlers to the provided promise.
 *
 * The returned object implements `PromiseLike<TValue>`, so you can chain additional `Promise` handlers using `then`. You may also use it with `await` in `async` functions.
 *
 * Note that the status strings are available as constants:
 * `mobxUtils.PENDING`, `mobxUtils.REJECTED`, `mobxUtil.FULFILLED`
 *
 * fromPromise takes an optional second argument, a previously created `fromPromise` based observable.
 * This is useful to replace one promise based observable with another, without going back to an intermediate
 * "pending" promise state while fetching data. For example:
 *
 * @example
 * \@observer
 * class SearchResults extends React.Component {
 *   \@observable.ref searchResults
 *
 *   componentDidUpdate(nextProps) {
 *     if (nextProps.query !== this.props.query)
 *       this.searchResults = fromPromise(
 *         window.fetch("/search?q=" + nextProps.query),
 *         // by passing, we won't render a pending state if we had a successful search query before
 *         // rather, we will keep showing the previous search results, until the new promise resolves (or rejects)
 *         this.searchResults
 *       )
 *   }
 *
 *   render() {
 *     return this.searchResults.case({
 *        pending: (staleValue) => {
 *          return staleValue || "searching" // <- value might set to previous results while the promise is still pending
 *        },
 *        fulfilled: (value) => {
 *          return value // the fresh results
 *        },
 *        rejected: (error) => {
 *          return "Oops: " + error
 *        }
 *     })
 *   }
 * }
 *
 * Observable promises can be created immediately in a certain state using
 * `fromPromise.reject(reason)` or `fromPromise.resolve(value?)`.
 * The main advantage of `fromPromise.resolve(value)` over `fromPromise(Promise.resolve(value))` is that the first _synchronously_ starts in the desired state.
 *
 * It is possible to directly create a promise using a resolve, reject function:
 * `fromPromise((resolve, reject) => setTimeout(() => resolve(true), 1000))`
 *
 * @example
 * const fetchResult = fromPromise(fetch("http://someurl"))
 *
 * // combine with when..
 * when(
 *   () => fetchResult.state !== "pending",
 *   () => {
 *     console.log("Got ", fetchResult.value)
 *   }
 * )
 *
 * // or a mobx-react component..
 * const myComponent = observer(({ fetchResult }) => {
 *   switch(fetchResult.state) {
 *      case "pending": return <div>Loading...</div>
 *      case "rejected": return <div>Ooops... {fetchResult.value}</div>
 *      case "fulfilled": return <div>Gotcha: {fetchResult.value}</div>
 *   }
 * })
 *
 * // or using the case method instead of switch:
 *
 * const myComponent = observer(({ fetchResult }) =>
 *   fetchResult.case({
 *     pending:   () => <div>Loading...</div>,
 *     rejected:  error => <div>Ooops.. {error}</div>,
 *     fulfilled: value => <div>Gotcha: {value}</div>,
 *   }))
 *
 * // chain additional handler(s) to the resolve/reject:
 *
 * fetchResult.then(
 *   (result) =>  doSomeTransformation(result),
 *   (rejectReason) => console.error('fetchResult was rejected, reason: ' + rejectReason)
 * ).then(
 *   (transformedResult) => console.log('transformed fetchResult: ' + transformedResult)
 * )
 *
 * @param {IThenable<T>} promise The promise which will be observed
 * @param {IThenable<T>} oldPromise? The previously observed promise
 * @returns {IPromiseBasedObservable<T>}
 */
export declare function fromPromise<T>(origPromise: PromiseLike<T>, oldPromise?: PromiseLike<T>): IPromiseBasedObservable<T>;
export declare namespace fromPromise {
    export const reject: (<T>(reason: any) => IRejectedPromise & IBasePromiseBasedObservable<T>) & import("mobx").IAction;
    function resolveBase<T>(value?: T): IFulfilledPromise<T | undefined> & IBasePromiseBasedObservable<T>;
    function resolveBase<T>(value: T): IFulfilledPromise<T> & IBasePromiseBasedObservable<T>;
    export const resolve: typeof resolveBase & import("mobx").IAction;
    export {};
}
/**
 * Returns true if the provided value is a promise-based observable.
 * @param value any
 * @returns {boolean}
 */
export declare function isPromiseBasedObservable(value: any): value is IPromiseBasedObservable<any>;
export {};
