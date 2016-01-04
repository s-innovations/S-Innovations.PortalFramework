define(["require", "exports", '../siStorage/siStorage'], function (require, exports, siStorage_1) {
    function setToken(ns, result) {
        var oauthStore = new siStorage_1.default("oauthStore", window.sessionStorage, ns);
        oauthStore.set(result);
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = setToken;
});
//# sourceMappingURL=setToken.js.map