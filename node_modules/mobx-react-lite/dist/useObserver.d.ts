export declare type ForceUpdateHook = () => () => void;
export interface IUseObserverOptions {
    useForceUpdate?: ForceUpdateHook;
}
export declare function useObserver<T>(fn: () => T, baseComponentName?: string, options?: IUseObserverOptions): T;
