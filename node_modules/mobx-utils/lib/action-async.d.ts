export declare function task<R>(this: any, value: R | PromiseLike<R>): Promise<R>;
export declare function actionAsync(target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;
export declare function actionAsync(target: object, propertyKey: string): void;
export declare function actionAsync<F extends (...args: any[]) => Promise<any>>(name: string, fn: F): F;
export declare function actionAsync<F extends (...args: any[]) => Promise<any>>(fn: F): F;
