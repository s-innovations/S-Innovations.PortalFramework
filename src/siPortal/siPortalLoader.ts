
/// <amd-dependency path="../koExtensions/koLayout" />

import ko = require("knockout");

class SIPortalLoader {

    hash: KnockoutObservable<string> = ko.observable(null).extend({ rateLimit: 0 });
    route: KnockoutObservable<Array<string>> = ko.observable([]);
    params = ko.observable<any>(null).extend({ rateLimit: 0 });

    constructor(data) {
           

        setTimeout(() => {
            ko.applyBindings(data.rootLayout);
        });


      
    }
    protected onHashChange() {
                     
        var hash = window.location.hash;


        var idx = hash.indexOf('?');
        var queryString = "";
        if (idx > -1) {
            queryString = hash.substr(idx + 1);
            hash = hash.substr(0, idx);
        } else {
            queryString = hash.substr(1);
        }

        var params = null,
            regex = /([^&=]+)=([^&]*)/g,
            m;

        while (m = regex.exec(queryString)) {
            params = params || {};
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }


        this.hash(hash.toLowerCase());
        this.route(this.hash().substr(1).match(/[^/]+/g));
        this.params(params);
    }
    initialize() {
        window.addEventListener("hashchange", this.onHashChange.bind(this), false);
        this.onHashChange();
    }
}
export = SIPortalLoader;   