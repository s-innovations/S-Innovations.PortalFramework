define(["require", "exports", "q"], function (require, exports, Q) {
    function throwIfHasBeenCalled(fn) {
        if (fn._called) {
            throw new Error('Cannot call next more than once');
        }
        return fn._called = true;
    }
    function throwIfNotFunction(x) {
        if ('function' !== typeof x) {
            throw new TypeError(x + ", middleware must be a function");
        }
        return x;
    }
    function tryInvokeMiddleware(context, middleware, next) {
        if (next === void 0) { next = function () { return Q.resolve(null); }; }
        try {
            return middleware
                ? Q.resolve(middleware(context, next))
                : Q.resolve(context);
        }
        catch (error) {
            return Q.reject(error);
        }
    }
    function middlewareReducer(composed, mw) {
        return function (context, nextFn) {
            var next = function () { return throwIfHasBeenCalled(next) && composed(context, nextFn); };
            return tryInvokeMiddleware(context, mw, next);
        };
    }
    /**
     * Create a function to invoke all passed middleware functions
     * with a single argument and context
     * @param {...Array<Function>} middleware, groups of middleware functions
     * @return {Function} Invoke the middleware pipeline
     */
    function compose() {
        var middleware = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middleware[_i - 0] = arguments[_i];
        }
        return (_a = []).concat.apply(_a, middleware)
            .filter(throwIfNotFunction)
            .reduceRight(middlewareReducer, tryInvokeMiddleware);
        var _a;
    }
    exports.compose = compose;
});
//# sourceMappingURL=compose.js.map