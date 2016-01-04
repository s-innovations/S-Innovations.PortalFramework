/// <amd-dependency path="../koExtensions/koLayout" />
define(["require", "exports", "knockout", "../koExtensions/koLayout"], function (require, exports, ko) {
    var SIPortalLoader = (function () {
        function SIPortalLoader(data) {
            this.hash = ko.observable(null).extend({ rateLimit: 0 });
            this.route = ko.observable([]);
            this.params = ko.observable(null).extend({ rateLimit: 0 });
            setTimeout(function () {
                ko.applyBindings(data.rootLayout);
            });
        }
        SIPortalLoader.prototype.onHashChange = function () {
            var hash = window.location.hash;
            var idx = hash.indexOf('?');
            var queryString = "";
            if (idx > -1) {
                queryString = hash.substr(idx + 1);
                hash = hash.substr(0, idx);
            }
            else {
                queryString = hash.substr(1);
            }
            var params = null, regex = /([^&=]+)=([^&]*)/g, m;
            while (m = regex.exec(queryString)) {
                params = params || {};
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            this.hash(hash.toLowerCase());
            this.route(this.hash().substr(1).match(/[^/]+/g));
            this.params(params);
        };
        SIPortalLoader.prototype.initialize = function () {
            window.addEventListener("hashchange", this.onHashChange.bind(this), false);
            this.onHashChange();
        };
        return SIPortalLoader;
    })();
    return SIPortalLoader;
});
//# sourceMappingURL=siPortalLoader.js.map