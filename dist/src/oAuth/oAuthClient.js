define(["require", "exports", "q", "./OAuthResult"], function (require, exports, q_1, OAuthResult_1) {
    var OAuthClient = (function () {
        function OAuthClient(url) {
            this.url = url;
        }
        OAuthClient.prototype.setUrl = function (url) {
            this.url = url;
        };
        OAuthClient.prototype.createSilentImplicitFlow = function (clientid, callback, scope, responseType) {
            if (responseType === void 0) { responseType = "token"; }
            if (!this.url)
                throw new Error();
            var deferred = q_1.defer();
            var request = this.createImplicitFlowRequest(clientid, callback, scope, { responseType: responseType, prompt: "none", isSilence: true });
            //  var iframe: JQuery = null;
            var iframe;
            var listener = function (e) {
                console.log([arguments, e.data, e.origin, e]);
                // iframe.remove();
                iframe.parentNode.removeChild(iframe);
                console.log([request, e.data]);
                if (request.state !== e.data.state || typeof (e.data.error) !== "undefined")
                    deferred.reject(e.data);
                window.removeEventListener("message", listener, false);
                deferred.resolve(e.data);
            };
            window.addEventListener('message', listener, false);
            //iframe = $('<iframe />', {
            //    name: 'myFrame',
            //    id: 'myFrame',
            //    src: "iframe.html",
            //    style: "right: 0;position: fixed;bottom: 0;top: 0; height: 100%; width: 60px;"
            //}).appendTo('body')
            //    .one("load", (e) => (<HTMLIFrameElement>e.target).contentWindow.postMessage(request.url, callback));
            iframe = document.createElement("iframe");
            iframe.name = "myFrame";
            iframe.id = "myFrame";
            iframe.setAttribute("src", "iframe.html");
            iframe.style.right = "0";
            iframe.style.position = "fixed";
            iframe.style.bottom = "0";
            iframe.style.top = "0";
            iframe.style.height = "100%";
            iframe.style.width = "60px";
            document.body.appendChild(iframe);
            iframe.onload = function (e) { return e.target.contentWindow.postMessage(request.url, callback); };
            return deferred.promise;
        };
        OAuthClient.prototype.createImplicitFlowRequest = function (clientid, callback, scope, options) {
            if (callback[callback.length - 1] === "/") {
                callback = callback.slice(0, callback.length - 1);
            }
            var state = ((Date.now() + Math.random()) * Math.random())
                .toString().replace(".", "");
            var nonce = ((Date.now() + Math.random()) * Math.random())
                .toString().replace(".", "");
            var url = this.url + "?" +
                "client_id=" + encodeURIComponent(clientid) + "&" +
                "redirect_uri=" + encodeURIComponent(callback + (options.isSilence ? "/iframe.html" : "/")) + "&" +
                "response_type=" + encodeURIComponent(options.responseType) + "&" +
                "scope=" + encodeURIComponent(scope) + "&" +
                "state=" + encodeURIComponent(state) + "&" +
                "nonce=" + encodeURIComponent(nonce);
            if (typeof (options.prompt) !== "undefined") {
                url += "&prompt=" + encodeURIComponent(options.prompt);
            }
            if (typeof (options.login_hint) !== "undefined") {
                url += "&login_hint=" + encodeURIComponent(options.login_hint);
            }
            if (typeof (options.acr_values) !== "undefined") {
                url += "&acr_values=" + encodeURIComponent(options.acr_values);
            }
            return {
                url: url,
                state: state,
                nonce: nonce
            };
        };
        OAuthClient.prototype.parseResult = function (queryStringOrParams) {
            if (typeof queryStringOrParams === "string") {
                var params = {}, regex = /([^&=]+)=([^&]*)/g, m;
                while (m = regex.exec(queryStringOrParams)) {
                    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                }
                for (var prop in params) {
                    return new OAuthResult_1.OAuthResult(this, params);
                }
            }
            else {
                return new OAuthResult_1.OAuthResult(this, queryStringOrParams);
            }
        };
        return OAuthClient;
    })();
    exports.OAuthClient = OAuthClient;
});
//# sourceMappingURL=OAuthClient.js.map