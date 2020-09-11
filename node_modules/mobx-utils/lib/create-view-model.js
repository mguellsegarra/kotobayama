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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, observable, isObservableObject, isObservableArray, isObservableMap, isComputedProp, isComputed, computed, keys, _getAdministration, $mobx, } from "mobx";
import { invariant, getAllMethodsAndProperties } from "./utils";
var RESERVED_NAMES = ["model", "reset", "submit", "isDirty", "isPropertyDirty", "resetProperty"];
var ViewModel = /** @class */ (function () {
    function ViewModel(model) {
        var _this = this;
        this.model = model;
        this.localValues = observable.map({});
        this.localComputedValues = observable.map({});
        this.isPropertyDirty = function (key) {
            return _this.localValues.has(key);
        };
        invariant(isObservableObject(model), "createViewModel expects an observable object");
        // use this helper as Object.getOwnPropertyNames doesn't return getters
        getAllMethodsAndProperties(model).forEach(function (key) {
            if (key === $mobx || key === "__mobxDidRunLazyInitializers") {
                return;
            }
            invariant(RESERVED_NAMES.indexOf(key) === -1, "The propertyname " + key + " is reserved and cannot be used with viewModels");
            if (isComputedProp(model, key)) {
                var derivation = _getAdministration(model, key).derivation; // Fixme: there is no clear api to get the derivation
                _this.localComputedValues.set(key, computed(derivation.bind(_this)));
            }
            var descriptor = Object.getOwnPropertyDescriptor(model, key);
            var additionalDescriptor = descriptor ? { enumerable: descriptor.enumerable } : {};
            Object.defineProperty(_this, key, __assign(__assign({}, additionalDescriptor), { configurable: true, get: function () {
                    if (isComputedProp(model, key))
                        return _this.localComputedValues.get(key).get();
                    if (_this.isPropertyDirty(key))
                        return _this.localValues.get(key);
                    else
                        return _this.model[key];
                }, set: action(function (value) {
                    if (value !== _this.model[key]) {
                        _this.localValues.set(key, value);
                    }
                    else {
                        _this.localValues.delete(key);
                    }
                }) }));
        });
    }
    Object.defineProperty(ViewModel.prototype, "isDirty", {
        get: function () {
            return this.localValues.size > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewModel.prototype, "changedValues", {
        get: function () {
            return this.localValues.toJS();
        },
        enumerable: false,
        configurable: true
    });
    ViewModel.prototype.submit = function () {
        var _this = this;
        keys(this.localValues).forEach(function (key) {
            var source = _this.localValues.get(key);
            var destination = _this.model[key];
            if (isObservableArray(destination)) {
                destination.replace(source);
            }
            else if (isObservableMap(destination)) {
                destination.clear();
                destination.merge(source);
            }
            else if (!isComputed(source)) {
                _this.model[key] = source;
            }
        });
        this.localValues.clear();
    };
    ViewModel.prototype.reset = function () {
        this.localValues.clear();
    };
    ViewModel.prototype.resetProperty = function (key) {
        this.localValues.delete(key);
    };
    __decorate([
        computed
    ], ViewModel.prototype, "isDirty", null);
    __decorate([
        computed
    ], ViewModel.prototype, "changedValues", null);
    __decorate([
        action.bound
    ], ViewModel.prototype, "submit", null);
    __decorate([
        action.bound
    ], ViewModel.prototype, "reset", null);
    __decorate([
        action.bound
    ], ViewModel.prototype, "resetProperty", null);
    return ViewModel;
}());
export { ViewModel };
/**
 * `createViewModel` takes an object with observable properties (model)
 * and wraps a viewmodel around it. The viewmodel proxies all enumerable properties of the original model with the following behavior:
 *  - as long as no new value has been assigned to the viewmodel property, the original property will be returned.
 *  - any future change in the model will be visible in the viewmodel as well unless the viewmodel property was dirty at the time of the attempted change.
 *  - once a new value has been assigned to a property of the viewmodel, that value will be returned during a read of that property in the future. However, the original model remain untouched until `submit()` is called.
 *
 * The viewmodel exposes the following additional methods, besides all the enumerable properties of the model:
 * - `submit()`: copies all the values of the viewmodel to the model and resets the state
 * - `reset()`: resets the state of the viewmodel, abandoning all local modifications
 * - `resetProperty(propName)`: resets the specified property of the viewmodel
 * - `isDirty`: observable property indicating if the viewModel contains any modifications
 * - `isPropertyDirty(propName)`: returns true if the specified property is dirty
 * - `changedValues`: returns a key / value map with the properties that have been changed in the model so far
 * - `model`: The original model object for which this viewModel was created
 *
 * You may use observable arrays, maps and objects with `createViewModel` but keep in mind to assign fresh instances of those to the viewmodel's properties, otherwise you would end up modifying the properties of the original model.
 * Note that if you read a non-dirty property, viewmodel only proxies the read to the model. You therefore need to assign a fresh instance not only the first time you make the assignment but also after calling `reset()` or `submit()`.
 *
 * @example
 * class Todo {
 *   \@observable title = "Test"
 * }
 *
 * const model = new Todo()
 * const viewModel = createViewModel(model);
 *
 * autorun(() => console.log(viewModel.model.title, ",", viewModel.title))
 * // prints "Test, Test"
 * model.title = "Get coffee"
 * // prints "Get coffee, Get coffee", viewModel just proxies to model
 * viewModel.title = "Get tea"
 * // prints "Get coffee, Get tea", viewModel's title is now dirty, and the local value will be printed
 * viewModel.submit()
 * // prints "Get tea, Get tea", changes submitted from the viewModel to the model, viewModel is proxying again
 * viewModel.title = "Get cookie"
 * // prints "Get tea, Get cookie" // viewModel has diverged again
 * viewModel.reset()
 * // prints "Get tea, Get tea", changes of the viewModel have been abandoned
 *
 * @param {T} model
 * @returns {(T & IViewModel<T>)}
 * ```
 */
export function createViewModel(model) {
    return new ViewModel(model);
}
