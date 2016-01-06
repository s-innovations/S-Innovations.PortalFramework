
import * as Q from "q";

function throwIfHasBeenCalled(fn) {
    if (fn._called) {
        throw new Error('Cannot call next more than once')
    }
    return fn._called = true
}

function throwIfNotFunction(x) {
    if ('function' !== typeof x) {
        throw new TypeError(`${x}, middleware must be a function`)
    }
    return x
}

function tryInvokeMiddleware(context, middleware, next = () => Q.resolve(null)) {
    try {
        return middleware
            ? Q.resolve(middleware(context, next))
            : Q.resolve(context)
    } catch (error) {
        return Q.reject(error)
    }
}

function middlewareReducer(composed, mw) {
    return function (context, nextFn) {
        const next = () => throwIfHasBeenCalled(next) && composed(context, nextFn)
        return tryInvokeMiddleware(context, mw, next)
    }
}

/**
 * Create a function to invoke all passed middleware functions
 * with a single argument and context
 * @param {...Array<Function>} middleware, groups of middleware functions
 * @return {Function} Invoke the middleware pipeline
 */
export function compose(...middleware) {
    return [].concat(...middleware)
        .filter(throwIfNotFunction)
        .reduceRight(middlewareReducer, tryInvokeMiddleware)
}