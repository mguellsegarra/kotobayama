import { IAction } from "../internal";
export interface IActionFactory {
    <T extends Function | null | undefined>(fn: T): T & IAction;
    <T extends Function | null | undefined>(name: string, fn: T): T & IAction;
    (customName: string): (target: Object, key: string | symbol, baseDescriptor?: PropertyDescriptor) => void;
    (target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void;
    bound(target: Object, propertyKey: string | symbol, descriptor?: PropertyDescriptor): void;
}
export declare const action: IActionFactory;
export declare function runInAction<T>(block: () => T): T;
export declare function runInAction<T>(name: string, block: () => T): T;
export declare function isAction(thing: any): boolean;
export declare function defineBoundAction(target: any, propertyName: string, fn: Function): void;
