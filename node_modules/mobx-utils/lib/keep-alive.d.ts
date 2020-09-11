import { IComputedValue } from "mobx";
import { IDisposer } from "./utils";
export declare function keepAlive(target: Object, property: string): IDisposer;
export declare function keepAlive(computedValue: IComputedValue<any>): IDisposer;
