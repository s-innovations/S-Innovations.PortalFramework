

import ko = require("knockout");
import koLayout = require("../koExtensions/koLayout");
import setDefaultProperties = require("../utils/setDefaultProperties");
import {Middleware, compose, AppFunc, AppEnvironmnet} from "../appBuilder/AppBuilder";


class SIPortalLoader {

    hash: KnockoutObservable<string> = ko.observable(null).extend({ rateLimit: 0 });
    route: KnockoutObservable<Array<string>> = ko.observable([]);
    params = ko.observable<any>(null).extend({ rateLimit: 0 });

    rootLayout: KnockoutObservable<koLayout>

    protected middlewares: Array<Middleware> = [];
    protected app: AppFunc;
    
    constructor(data: { rootLayout?: koLayout } = {}) {
        setDefaultProperties(this, data, {
            rootLayout: undefined
        });
           
        if (data.rootLayout) {
            setTimeout(() => {
                ko.applyBindings(data.rootLayout);
            });
        }

        this.rootLayout.subscribe(r=> {
            ko.applyBindings(r);
        });
      
    }
    protected createAppEnvironment() : AppEnvironmnet {
        var env = {
            hash: this.hash(),
            originalHash: location.hash,
            route: this.route(),
            params: this.params(),
            loader: this,
            "skipNextHashChange": this.skipNextHashChange
        };

        return env;
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


        
        var env = this.createAppEnvironment();
        this.app(env);
        this.skipNextHashChange = env["skipNextHashChange"];

    }
    initialize() {

        this.app = compose(this.middlewares);

        window.addEventListener("hashchange", this.onHashChange.bind(this), false);
        this.onHashChange();
    }

    private skipNextHashChange;
    cleanUpHash() {
        this.skipNextHashChange = true;
        location.hash = "";
    }
}
export = SIPortalLoader;   