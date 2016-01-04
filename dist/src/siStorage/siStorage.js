define(["require", "exports"], function (require, exports) {
    var siStorage = (function () {
        function siStorage(name, store, ns) {
            if (ns === void 0) { ns = ""; }
            this.name = name;
            this.store = store;
            this.ns = ns;
        }
        siStorage.prototype.get = function () {
            var item = this.store.getItem(this.ns + this.name);
            if (item) {
                return JSON.parse(item);
            }
        };
        siStorage.prototype.set = function (value) {
            if (value) {
                var val = JSON.stringify(value);
                this.store.setItem(this.ns + this.name, val);
            }
            else {
                this.store.removeItem(this.ns + this.name);
            }
        };
        return siStorage;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = siStorage;
});
//# sourceMappingURL=siStorage.js.map