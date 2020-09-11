var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computed, observable, action, runInAction } from "mobx";
function observableSymbol() {
    return (typeof Symbol === "function" && Symbol.observable) || "@@observable";
}
/**
 * Converts an expression to an observable stream (a.k.a. TC 39 Observable / RxJS observable).
 * The provided expression is tracked by mobx as long as there are subscribers, automatically
 * emitting when new values become available. The expressions respect (trans)actions.
 *
 * @example
 *
 * const user = observable({
 *   firstName: "C.S",
 *   lastName: "Lewis"
 * })
 *
 * Rx.Observable
 *   .from(mobxUtils.toStream(() => user.firstname + user.lastName))
 *   .scan(nameChanges => nameChanges + 1, 0)
 *   .subscribe(nameChanges => console.log("Changed name ", nameChanges, "times"))
 *
 * @export
 * @template T
 * @param {() => T} expression
 * @param {boolean} fireImmediately (by default false)
 * @returns {IObservableStream<T>}
 */
export function toStream(expression, fireImmediately) {
    var _a;
    if (fireImmediately === void 0) { fireImmediately = false; }
    var computedValue = computed(expression);
    return _a = {
            subscribe: function (observer) {
                if ("function" === typeof observer) {
                    return {
                        unsubscribe: computedValue.observe(function (_a) {
                            var newValue = _a.newValue;
                            return observer(newValue);
                        }, fireImmediately),
                    };
                }
                if (observer && "object" === typeof observer && observer.next) {
                    return {
                        unsubscribe: computedValue.observe(function (_a) {
                            var newValue = _a.newValue;
                            return observer.next(newValue);
                        }, fireImmediately),
                    };
                }
                return {
                    unsubscribe: function () { },
                };
            }
        },
        _a[observableSymbol()] = function () {
            return this;
        },
        _a;
}
var StreamListener = /** @class */ (function () {
    function StreamListener(observable, initialValue) {
        var _this = this;
        runInAction(function () {
            _this.current = initialValue;
            _this.subscription = observable.subscribe(_this);
        });
    }
    StreamListener.prototype.dispose = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    StreamListener.prototype.next = function (value) {
        this.current = value;
    };
    StreamListener.prototype.complete = function () {
        this.dispose();
    };
    StreamListener.prototype.error = function (value) {
        this.current = value;
        this.dispose();
    };
    __decorate([
        observable.ref
    ], StreamListener.prototype, "current", void 0);
    __decorate([
        action.bound
    ], StreamListener.prototype, "next", null);
    __decorate([
        action.bound
    ], StreamListener.prototype, "complete", null);
    __decorate([
        action.bound
    ], StreamListener.prototype, "error", null);
    return StreamListener;
}());
export function fromStream(observable, initialValue) {
    if (initialValue === void 0) { initialValue = undefined; }
    return new StreamListener(observable, initialValue);
}
