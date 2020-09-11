export interface ILazyObservable<T> {
    current(): T;
    refresh(): T;
    reset(): T;
    pending: boolean;
}
export declare function lazyObservable<T>(fetch: (sink: (newValue: T) => void) => void): ILazyObservable<T | undefined>;
export declare function lazyObservable<T>(fetch: (sink: (newValue: T) => void) => void, initialValue: T): ILazyObservable<T>;
