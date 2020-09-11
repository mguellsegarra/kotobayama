/**
 * @private
 */
var DeepMapEntry = /** @class */ (function () {
    function DeepMapEntry(base, args) {
        this.base = base;
        this.args = args;
        this.closestIdx = 0;
        this.isDisposed = false;
        var current = (this.closest = this.root = base);
        var i = 0;
        for (; i < this.args.length - 1; i++) {
            current = current.get(args[i]);
            if (current)
                this.closest = current;
            else
                break;
        }
        this.closestIdx = i;
    }
    DeepMapEntry.prototype.exists = function () {
        this.assertNotDisposed();
        var l = this.args.length;
        return this.closestIdx >= l - 1 && this.closest.has(this.args[l - 1]);
    };
    DeepMapEntry.prototype.get = function () {
        this.assertNotDisposed();
        if (!this.exists())
            throw new Error("Entry doesn't exist");
        return this.closest.get(this.args[this.args.length - 1]);
    };
    DeepMapEntry.prototype.set = function (value) {
        this.assertNotDisposed();
        var l = this.args.length;
        var current = this.closest;
        // create remaining maps
        for (var i = this.closestIdx; i < l - 1; i++) {
            var m = new Map();
            current.set(this.args[i], m);
            current = m;
        }
        this.closestIdx = l - 1;
        this.closest = current;
        current.set(this.args[l - 1], value);
    };
    DeepMapEntry.prototype.delete = function () {
        this.assertNotDisposed();
        if (!this.exists())
            throw new Error("Entry doesn't exist");
        var l = this.args.length;
        this.closest.delete(this.args[l - 1]);
        // clean up remaining maps if needed (reconstruct stack first)
        var c = this.root;
        var maps = [c];
        for (var i = 0; i < l - 1; i++) {
            c = c.get(this.args[i]);
            maps.push(c);
        }
        for (var i = maps.length - 1; i > 0; i--) {
            if (maps[i].size === 0)
                maps[i - 1].delete(this.args[i - 1]);
        }
        this.isDisposed = true;
    };
    DeepMapEntry.prototype.assertNotDisposed = function () {
        // TODO: once this becomes annoying, we should introduce a reset method to re-run the constructor logic
        if (this.isDisposed)
            throw new Error("Concurrent modification exception");
    };
    return DeepMapEntry;
}());
export { DeepMapEntry };
/**
 * @private
 */
var DeepMap = /** @class */ (function () {
    function DeepMap() {
        this.store = new Map();
        this.argsLength = -1;
    }
    DeepMap.prototype.entry = function (args) {
        if (this.argsLength === -1)
            this.argsLength = args.length;
        else if (this.argsLength !== args.length)
            throw new Error("DeepMap should be used with functions with a consistent length, expected: " + this.argsLength + ", got: " + args.length);
        if (this.last)
            this.last.isDisposed = true;
        return (this.last = new DeepMapEntry(this.store, args));
    };
    return DeepMap;
}());
export { DeepMap };
