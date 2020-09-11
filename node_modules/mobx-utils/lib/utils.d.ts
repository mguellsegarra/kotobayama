export declare type IDisposer = () => void;
export declare const NOOP: () => void;
export declare const IDENTITY: (_: any) => any;
export declare function fail(message: string): never;
export declare function invariant(cond: boolean, message?: string): void;
export declare function deprecated(msg: string): void;
export declare function addHiddenProp(object: any, propName: string, value: any): void;
export declare const getAllMethodsAndProperties: (x: any) => any;
