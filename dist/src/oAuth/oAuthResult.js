define(["require", "exports"], function (require, exports) {
    function parseExpiresIn(value) {
        if (typeof value === "string")
            return parseFloat(value);
        else
            return value;
    }
    var OAuthResult = (function () {
        function OAuthResult(client, data) {
            this.client = client;
            if (data) {
                this.id_token = data.id_token;
                this.expires_in = parseExpiresIn(data.expires_in);
                this.scope = data.scope;
                this.state = data.state;
                this.token_type = data.token_type;
                this.access_token = data.access_token;
                this.expires_at = data.expires_at || new Date().getTime() + this.expires_in * 1000;
            }
        }
        return OAuthResult;
    })();
    exports.OAuthResult = OAuthResult;
});
//# sourceMappingURL=OAuthResult.js.map