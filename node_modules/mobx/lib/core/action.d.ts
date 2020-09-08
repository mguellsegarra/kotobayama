import { IDerivation } from "../internal";
export interface IAction {
    isMobxAction: boolean;
}
export declare function createAction(actionName: string, fn: Function, ref?: Object): Function & IAction;
export declare function executeAction(actionName: string, fn: Function, scope?: any, args?: IArguments): any;
export interface IActionRunInfo {
    prevDerivation: IDerivation | null;
    prevAllowStateChanges: boolean;
    prevAllowStateReads: boolean;
    notifySpy: boolean;
    startTime: number;
    error?: any;
    parentActionId: number;
    actionId: number;
}
export declare function _startAction(actionName: string, scope: any, args?: IArguments): IActionRunInfo;
export declare function _endAction(runInfo: IActionRunInfo): void;
export declare function allowStateChanges<T>(allowStateChanges: boolean, func: () => T): T;
export declare function allowStateChangesStart(allowStateChanges: boolean): boolean;
export declare function allowStateChangesEnd(prev: boolean): void;
export declare function allowStateChangesInsideComputed<T>(func: () => T): T;
