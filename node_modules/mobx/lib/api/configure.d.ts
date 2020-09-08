export declare function configure(options: {
    enforceActions?: boolean | "strict" | "never" | "always" | "observed";
    computedRequiresReaction?: boolean;
    /**
     * (Experimental)
     * Warn if you try to create to derivation / reactive context without accessing any observable.
     */
    reactionRequiresObservable?: boolean;
    /**
     * (Experimental)
     * Warn if observables are accessed outside a reactive context
     */
    observableRequiresReaction?: boolean;
    computedConfigurable?: boolean;
    isolateGlobalState?: boolean;
    disableErrorBoundaries?: boolean;
    reactionScheduler?: (f: () => void) => void;
}): void;
