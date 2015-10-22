

import ko = require("knockout");

        
function requireTextObservable(txt) {
    var value = ko.observable("");
    require(["text!" + txt], svg=> {
        value(svg);
    });
    return value;
};

ko.requireTextObservable = requireTextObservable;

export =  requireTextObservable;