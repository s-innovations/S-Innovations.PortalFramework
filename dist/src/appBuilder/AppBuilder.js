define(["require", "exports", './compose'], function (require, exports, compose_1) {
    exports.compose = compose_1.compose;
    var AppBuilder = (function () {
        function AppBuilder() {
            this.middleware = [];
        }
        AppBuilder.prototype.build = function () {
            if (!this.middleware.length) {
                throw new Error('Usage error: must have at least one middleware');
            }
            return compose_1.compose(this.middleware);
        };
        AppBuilder.prototype.use = function (mw) {
            if ('function' !== typeof mw) {
                throw new TypeError(mw + ", middleware must be a function");
            }
            this.middleware.push(mw);
            return this;
        };
        return AppBuilder;
    })();
    exports.AppBuilder = AppBuilder;
    function default_1() {
        return new AppBuilder();
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = default_1;
});
//# sourceMappingURL=AppBuilder.js.map