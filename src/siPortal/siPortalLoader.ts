﻿
/// <amd-dependency path="../koExtensions/koLayout" />

import ko = require("knockout");

class SIPortalLoader {

    constructor(data) {
           

        setTimeout(() => {
            ko.applyBindings(data.rootLayout);
        });
    }
}
export = SIPortalLoader;   