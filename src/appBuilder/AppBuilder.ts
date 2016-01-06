import { compose } from './compose'


interface AppEnvironmnet {
    hash: string
    originalHash: string
    route: string[];
    params: string;
    [key: string]: any;
}

interface AppFunc {
    (env: AppEnvironmnet): void;
}

interface Middleware {
    (env: AppEnvironmnet, next: AppFunc): void | Q.Promise<void>;
}

class AppBuilder<T extends AppEnvironmnet> {

    private middleware = []
    constructor() {

    }

    build() {
        if (!this.middleware.length) {
            throw new Error('Usage error: must have at least one middleware')
        }
        return compose(this.middleware)
    }

    use(mw) {
        if ('function' !== typeof mw) {
            throw new TypeError(`${mw}, middleware must be a function`)
        }
        this.middleware.push(mw)
        return this
    }
}

export default function <T extends AppEnvironmnet>() {
    return new AppBuilder<T>()
}

export {
compose,
AppBuilder,
AppFunc,
AppEnvironmnet,
Middleware
}