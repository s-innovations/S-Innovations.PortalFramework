define(["require", "exports", "knockout", "../utils/setDefaultProperties", "../appBuilder/appBuilder"], function (require, exports, ko, setDefaultProperties, appBuilder_1) {
    var SIPortalLoader = (function () {
        function SIPortalLoader(data) {
            if (data === void 0) { data = {}; }
            this.hash = ko.observable(null).extend({ rateLimit: 0 });
            this.route = ko.observable([]);
            this.params = ko.observable(null).extend({ rateLimit: 0 });
            this.middlewares = [];
            setDefaultProperties(this, data, {
                rootLayout: undefined
            });
            if (data.rootLayout) {
                setTimeout(function () {
                    ko.applyBindings(data.rootLayout);
                });
            }
            this.rootLayout.subscribe(function (r) {
                ko.applyBindings(r);
            });
        }
        SIPortalLoader.prototype.createAppEnvironment = function () {
            var env = {
                hash: this.hash(),
                originalHash: location.hash,
                route: this.route(),
                params: this.params(),
                loader: this,
                "skipNextHashChange": this.skipNextHashChange
            };
            return env;
        };
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
            var env = this.createAppEnvironment();
            this.app(env);
            this.skipNextHashChange = env["skipNextHashChange"];
        };
        SIPortalLoader.prototype.initialize = function () {
            this.app = appBuilder_1.compose(this.middlewares);
            window.addEventListener("hashchange", this.onHashChange.bind(this), false);
            this.onHashChange();
        };
        SIPortalLoader.prototype.cleanUpHash = function () {
            this.skipNextHashChange = true;
            location.hash = "";
        };
        return SIPortalLoader;
    })();
    return SIPortalLoader;
});
//# sourceMappingURL=siPortalLoader.js.map