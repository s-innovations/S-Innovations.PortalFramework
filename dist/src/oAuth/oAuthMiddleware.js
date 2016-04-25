define(["require", "exports"], function (require, exports) {
    function OAuthMiddleware(envOrOptions, envOrNext, nextOrnull) {
        var env = (arguments.length === 2 ? envOrOptions : envOrNext);
        var next = (arguments.length === 2 ? envOrNext : nextOrnull);
        var options = arguments.length === 2 ? {} : envOrOptions;
        if (env.params && env.params["id_token"]) {
            if (!env.user.handleAuthorizationCallback(env.params)) {
                if (confirm("Authorization Failed. Reset?")) {
                    env.user.clearCache();
                    window.location.href = window.location.protocol + "//" + window.location.host;
                }
            }
            else {
                //TODO Clean this up as its hardcoded to fit with the portal loader.
                var action = window.sessionStorage.getItem("afterAuthenticationAction");
                if (action) {
                    window.sessionStorage.removeItem("afterAuthenticationAction");
                    window.location.hash = action;
                }
                else {
                    env.loader.cleanUpHash();
                }
            }
            return;
        }
        return next(env);
    }
    exports.OAuthMiddleware = OAuthMiddleware;
});
//# sourceMappingURL=OAuthMiddleware.js.map