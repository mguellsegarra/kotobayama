import { observe, isObservableMap, isObservableObject, isObservableArray, values, entries, } from "mobx";
function buildPath(entry) {
    if (!entry)
        return "ROOT";
    var res = [];
    while (entry.parent) {
        res.push(entry.path);
        entry = entry.parent;
    }
    return res.reverse().join("/");
}
function isRecursivelyObservable(thing) {
    return isObservableObject(thing) || isObservableArray(thing) || isObservableMap(thing);
}
/**
 * Given an object, deeply observes the given object.
 * It is like `observe` from mobx, but applied recursively, including all future children.
 *
 * Note that the given object cannot ever contain cycles and should be a tree.
 *
 * As benefit: path and root will be provided in the callback, so the signature of the listener is
 * (change, path, root) => void
 *
 * The returned disposer can be invoked to clean up the listener
 *
 * deepObserve cannot be used on computed values.
 *
 * @example
 * const disposer = deepObserve(target, (change, path) => {
 *    console.dir(change)
 * })
 */
export function deepObserve(target, listener) {
    var entrySet = new WeakMap();
    function genericListener(change) {
        var entry = entrySet.get(change.object);
        processChange(change, entry);
        listener(change, buildPath(entry), target);
    }
    function processChange(change, parent) {
        switch (change.type) {
            // Object changes
            case "add": // also for map
                observeRecursively(change.newValue, parent, change.name);
                break;
            case "update": // also for array and map
                unobserveRecursively(change.oldValue);
                observeRecursively(change.newValue, parent, change.name || "" + change.index);
                break;
            case "remove": // object
            case "delete": // map
                unobserveRecursively(change.oldValue);
                break;
            // Array changes
            case "splice":
                change.removed.map(unobserveRecursively);
                change.added.forEach(function (value, idx) {
                    return observeRecursively(value, parent, "" + (change.index + idx));
                });
                // update paths
                for (var i = change.index + change.addedCount; i < change.object.length; i++) {
                    if (isRecursivelyObservable(change.object[i])) {
                        var entry = entrySet.get(change.object[i]);
                        if (entry)
                            entry.path = "" + i;
                    }
                }
                break;
        }
    }
    function observeRecursively(thing, parent, path) {
        if (isRecursivelyObservable(thing)) {
            var entry = entrySet.get(thing);
            if (entry) {
                if (entry.parent !== parent || entry.path !== path)
                    // MWE: this constraint is artificial, and this tool could be made to work with cycles,
                    // but it increases administration complexity, has tricky edge cases and the meaning of 'path'
                    // would become less clear. So doesn't seem to be needed for now
                    throw new Error("The same observable object cannot appear twice in the same tree," +
                        (" trying to assign it to '" + buildPath(parent) + "/" + path + "',") +
                        (" but it already exists at '" + buildPath(entry.parent) + "/" + entry.path + "'"));
            }
            else {
                var entry_1 = {
                    parent: parent,
                    path: path,
                    dispose: observe(thing, genericListener),
                };
                entrySet.set(thing, entry_1);
                entries(thing).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    return observeRecursively(value, entry_1, key);
                });
            }
        }
    }
    function unobserveRecursively(thing) {
        if (isRecursivelyObservable(thing)) {
            var entry = entrySet.get(thing);
            if (!entry)
                return;
            entrySet.delete(thing);
            entry.dispose();
            values(thing).forEach(unobserveRecursively);
        }
    }
    observeRecursively(target, undefined, "");
    return function () {
        unobserveRecursively(target);
    };
}
