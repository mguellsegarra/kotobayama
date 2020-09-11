import { IDisposer } from "./utils";
export interface IResource<T> {
    current(): T;
    dispose(): void;
    isAlive(): boolean;
}
export declare function fromResource<T>(subscriber: (sink: (newValue: T) => void) => void, unsubscriber?: IDisposer): IResource<T | undefined>;
export declare function fromResource<T>(subscriber: (sink: (newValue: T) => void) => void, unsubscriber: IDisposer | undefined, initialValue: T): IResource<T>;
