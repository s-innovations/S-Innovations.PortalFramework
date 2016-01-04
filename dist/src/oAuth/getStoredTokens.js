define(["require", "exports", '../siStorage/siStorage'], function (require, exports, siStorage_1) {
    function getStoredTokens(ns) {
        return new siStorage_1.default("oauthStore", window.sessionStorage, ns).get()
            || new siStorage_1.default("oauthStore", window.localStorage, ns).get();
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = getStoredTokens;
});
//# sourceMappingURL=getStoredTokens.js.map