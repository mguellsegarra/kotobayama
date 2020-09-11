declare type BabelDescriptor = PropertyDescriptor & {
    initializer?: () => any;
};
export declare function decorateMethodOrField(decoratorName: string, decorateFn: (pname: string, v: any) => any, target: object, prop: string, descriptor?: BabelDescriptor): {
    value: any;
    enumerable: boolean;
    configurable: boolean;
    writable: boolean;
} | {
    enumerable: boolean;
    configurable: boolean;
    writable: boolean;
    initializer(): any;
    value?: undefined;
} | undefined;
export declare function decorateMethod(decoratorName: string, decorateFn: (pname: string, v: any) => any, prop: string, descriptor: BabelDescriptor): {
    value: any;
    enumerable: boolean;
    configurable: boolean;
    writable: boolean;
} | {
    enumerable: boolean;
    configurable: boolean;
    writable: boolean;
    initializer(): any;
    value?: undefined;
};
export declare function decorateField(decorateFn: (pname: string, v: any) => any, target: object, prop: string): void;
export {};
