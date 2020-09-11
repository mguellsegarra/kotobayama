import { addHiddenProp } from "./utils";
export function decorateMethodOrField(decoratorName, decorateFn, target, prop, descriptor) {
    if (descriptor) {
        return decorateMethod(decoratorName, decorateFn, prop, descriptor);
    }
    else {
        decorateField(decorateFn, target, prop);
    }
}
export function decorateMethod(decoratorName, decorateFn, prop, descriptor) {
    if (descriptor.get !== undefined) {
        return fail(decoratorName + " cannot be used with getters");
    }
    // babel / typescript
    // @action method() { }
    if (descriptor.value) {
        // typescript
        return {
            value: decorateFn(prop, descriptor.value),
            enumerable: false,
            configurable: true,
            writable: true,
        };
    }
    // babel only: @action method = () => {}
    var initializer = descriptor.initializer;
    return {
        enumerable: false,
        configurable: true,
        writable: true,
        initializer: function () {
            // N.B: we can't immediately invoke initializer; this would be wrong
            return decorateFn(prop, initializer.call(this));
        },
    };
}
export function decorateField(decorateFn, target, prop) {
    // Simple property that writes on first invocation to the current instance
    Object.defineProperty(target, prop, {
        configurable: true,
        enumerable: false,
        get: function () {
            return undefined;
        },
        set: function (value) {
            addHiddenProp(this, prop, decorateFn(prop, value));
        },
    });
}
