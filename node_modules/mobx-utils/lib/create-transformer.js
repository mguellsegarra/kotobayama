var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { computed, onBecomeUnobserved, _isComputingDerivation, } from "mobx";
import { invariant, addHiddenProp } from "./utils";
var memoizationId = 0;
export function createTransformer(transformer, arg2) {
    invariant(typeof transformer === "function" && transformer.length < 2, "createTransformer expects a function that accepts one argument");
    // Memoizes: object id -> reactive view that applies transformer to the object
    var views = {};
    var onCleanup = undefined;
    var keepAlive = false;
    var debugNameGenerator = undefined;
    if (typeof arg2 === "object") {
        onCleanup = arg2.onCleanup;
        keepAlive = arg2.keepAlive !== undefined ? arg2.keepAlive : false;
        debugNameGenerator = arg2.debugNameGenerator;
    }
    else if (typeof arg2 === "function") {
        onCleanup = arg2;
    }
    function createView(sourceIdentifier, sourceObject) {
        var latestValue;
        var computedValueOptions = {};
        if (typeof arg2 === "object") {
            onCleanup = arg2.onCleanup;
            debugNameGenerator = arg2.debugNameGenerator;
            computedValueOptions = arg2;
        }
        else if (typeof arg2 === "function") {
            onCleanup = arg2;
        }
        else {
            onCleanup = undefined;
            debugNameGenerator = undefined;
        }
        var prettifiedName = debugNameGenerator
            ? debugNameGenerator(sourceObject)
            : "Transformer-" + transformer.name + "-" + sourceIdentifier;
        var expr = computed(function () {
            return (latestValue = transformer(sourceObject));
        }, __assign(__assign({}, computedValueOptions), { name: prettifiedName }));
        if (!keepAlive) {
            var disposer_1 = onBecomeUnobserved(expr, function () {
                delete views[sourceIdentifier];
                disposer_1();
                if (onCleanup)
                    onCleanup(latestValue, sourceObject);
            });
        }
        return expr;
    }
    var memoWarned = false;
    return function (object) {
        var identifier = getMemoizationId(object);
        var reactiveView = views[identifier];
        if (reactiveView)
            return reactiveView.get();
        if (!keepAlive && !_isComputingDerivation()) {
            if (!memoWarned) {
                console.warn("invoking a transformer from outside a reactive context won't memorized " +
                    "and is cleaned up immediately, unless keepAlive is set");
                memoWarned = true;
            }
            var value = transformer(object);
            if (onCleanup)
                onCleanup(value, object);
            return value;
        }
        // Not in cache; create a reactive view
        reactiveView = views[identifier] = createView(identifier, object);
        return reactiveView.get();
    };
}
function getMemoizationId(object) {
    var objectType = typeof object;
    if (objectType === "string")
        return "string:" + object;
    if (objectType === "number")
        return "number:" + object;
    if (object === null || (objectType !== "object" && objectType !== "function"))
        throw new Error("[mobx-utils] transform expected an object, function, string or number, got: " + String(object));
    var tid = object.$transformId;
    if (tid === undefined) {
        tid = "memoizationId:" + ++memoizationId;
        addHiddenProp(object, "$transformId", tid);
    }
    return tid;
}
