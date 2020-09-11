export var NOOP = function () { };
export var IDENTITY = function (_) { return _; };
export function fail(message) {
    throw new Error("[mobx-utils] " + message);
}
export function invariant(cond, message) {
    if (message === void 0) { message = "Illegal state"; }
    if (!cond)
        fail(message);
}
var deprecatedMessages = [];
export function deprecated(msg) {
    if (deprecatedMessages.indexOf(msg) !== -1)
        return;
    deprecatedMessages.push(msg);
    console.error("[mobx-utils] Deprecated: " + msg);
}
export function addHiddenProp(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value,
    });
}
var deepFields = function (x) {
    return (x &&
        x !== Object.prototype &&
        Object.getOwnPropertyNames(x).concat(deepFields(Object.getPrototypeOf(x)) || []));
};
var distinctDeepFields = function (x) {
    var deepFieldsIndistinct = deepFields(x);
    var deepFieldsDistinct = deepFieldsIndistinct.filter(function (item, index) { return deepFieldsIndistinct.indexOf(item) === index; });
    return deepFieldsDistinct;
};
export var getAllMethodsAndProperties = function (x) {
    return distinctDeepFields(x).filter(function (name) { return name !== "constructor" && !~name.indexOf("__"); });
};
