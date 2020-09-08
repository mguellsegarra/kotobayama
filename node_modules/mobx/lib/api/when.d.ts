import { IReactionDisposer, Lambda } from "../internal";
export interface IWhenOptions {
    name?: string;
    timeout?: number;
    /**
     * Experimental.
     * Warns if the view doesn't track observables
     */
    requiresObservable?: boolean;
    onError?: (error: any) => void;
}
export declare function when(predicate: () => boolean, opts?: IWhenOptions): Promise<void> & {
    cancel(): void;
};
export declare function when(predicate: () => boolean, effect: Lambda, opts?: IWhenOptions): IReactionDisposer;
