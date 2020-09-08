export declare type ForceUpdate = () => void;
export declare function useQueuedForceUpdate(forceUpdate: ForceUpdate): ForceUpdate;
export declare function useQueuedForceUpdateBlock<T>(callback: () => T): T;
