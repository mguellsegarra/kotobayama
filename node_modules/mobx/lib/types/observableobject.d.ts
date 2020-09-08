import { ComputedValue, IAtom, IComputedValueOptions, IEnhancer, IInterceptable, IListenable, Lambda, ObservableValue } from "../internal";
export interface IObservableObject {
    "observable-object": IObservableObject;
}
export declare type IObjectDidChange<T = any> = {
    name: PropertyKey;
    object: T;
    type: "add";
    newValue: any;
} | {
    name: PropertyKey;
    object: T;
    type: "update";
    oldValue: any;
    newValue: any;
} | {
    name: PropertyKey;
    object: T;
    type: "remove";
    oldValue: any;
};
export declare type IObjectWillChange<T = any> = {
    object: T;
    type: "update" | "add";
    name: PropertyKey;
    newValue: any;
} | {
    object: T;
    type: "remove";
    name: PropertyKey;
};
export declare class ObservableObjectAdministration implements IInterceptable<IObjectWillChange>, IListenable {
    target: any;
    values: Map<string | number | symbol, ObservableValue<any> | ComputedValue<any>>;
    name: string;
    defaultEnhancer: IEnhancer<any>;
    keysAtom: IAtom;
    changeListeners: any;
    interceptors: any;
    private proxy;
    private pendingKeys;
    constructor(target: any, values: Map<string | number | symbol, ObservableValue<any> | ComputedValue<any>>, name: string, defaultEnhancer: IEnhancer<any>);
    read(key: PropertyKey): any;
    write(key: PropertyKey, newValue: any): void;
    has(key: PropertyKey): any;
    addObservableProp(propName: PropertyKey, newValue: any, enhancer?: IEnhancer<any>): void;
    addComputedProp(propertyOwner: any, // where is the property declared?
    propName: PropertyKey, options: IComputedValueOptions<any>): void;
    remove(key: PropertyKey): void;
    illegalAccess(owner: any, propName: any): void;
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    observe(callback: (changes: IObjectDidChange) => void, fireImmediately?: boolean): Lambda;
    intercept(handler: any): Lambda;
    notifyPropertyAddition(key: PropertyKey, newValue: any): void;
    getKeys(): PropertyKey[];
}
export interface IIsObservableObject {
    $mobx: ObservableObjectAdministration;
}
export declare function asObservableObject(target: any, name?: PropertyKey, defaultEnhancer?: IEnhancer<any>): ObservableObjectAdministration;
export declare function generateObservablePropConfig(propName: any): any;
export declare function generateComputedPropConfig(propName: any): any;
export declare function isObservableObject(thing: any): thing is IObservableObject;
