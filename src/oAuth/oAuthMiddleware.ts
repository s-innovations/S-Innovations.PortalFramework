

import { AppEnvironmnet, AppFunc } from '../appBuilder/AppBuilder';

export interface OAuthUser {
    handleAuthorizationCallback(params: string);
    clearCache(): void;

}
export interface OAuthLoader {
    cleanUpHash(): void;
}
export interface OAuthAppEnvironment<TUser extends OAuthUser, TLoader extends OAuthLoader> extends AppEnvironmnet {
    user: TUser;
    loader: TLoader
}


export function OAuthMiddleware<TUser extends OAuthUser, TLoader extends OAuthLoader>(envOrOptions: OAuthAppEnvironment<TUser, TLoader> | any, envOrNext: OAuthAppEnvironment<TUser, TLoader> | AppFunc, nextOrnull: AppFunc | void) {
    let env = (arguments.length === 2 ? envOrOptions : envOrNext) as OAuthAppEnvironment<TUser, TLoader>;
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
                env.loader.cleanUpHash();
            }
        }
        return;
    }

    return next(env);

}