define(["require", "exports"], function (require, exports) {
    var oAuthResult = (function () {
        function oAuthResult(client, data) {
            this.client = client;
            if (data) {
                this.id_token = data.id_token;
                this.expires_in = data.expires_in;
                this.scope = data.scope;
                this.state = data.state;
                this.token_type = data.token_type;
                this.access_token = data.access_token;
                this.expires_at = new Date().getTime() + parseFloat(data.expires_in) * 1000;
            }
        }
        return oAuthResult;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = oAuthResult;
});
//# sourceMappingURL=oAuthResult.js.map