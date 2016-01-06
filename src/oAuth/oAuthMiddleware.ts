

import { AppEnvironmnet, AppFunc } from '../appBuilder/AppBuilder';
export interface oAuthAppEnvironment extends AppEnvironmnet {
    user: any;
}

export function oAuthMiddleware(envOrOptions: oAuthAppEnvironment | any, envOrNext: oAuthAppEnvironment | AppFunc, nextOrnull: AppFunc | void) {
    let env = (arguments.length === 2 ? envOrOptions : envOrNext) as oAuthAppEnvironment;
    let next = (arguments.length === 2 ? envOrNext : nextOrnull) as AppFunc;
    let options = arguments.length === 2 ? {} : envOrOptions;

    if (env.params && env.params["id_token"]) {
        if (!env.user.handleAuthorizationCallback(env.params)) {
            if (confirm("Authorization Failed. Reset?")) {

                env.user.clearCache();
                window.location.href = window.location.protocol + "//" + window.location.host;

            }
        } else {
            //TODO Clean this up as its hardcoded to fit with the portal loader.
            var action = window.sessionStorage.getItem("afterAuthenticationAction");
            if (action) {
                window.sessionStorage.removeItem("afterAuthenticationAction");
                window.location.hash = action;
            } else {
                env["loader"].cleanUpHash();
            }
        }
        return;
    }

    return next(env);

}