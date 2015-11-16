
import makeObservable = require("../koExtensions/makeObservable");
import isDefined = require("./isDefined");

function setDefaultProperties(obj: any, props, defaults, mapper?) {
    for (var key in defaults) {

        var value = isDefined(props[key]) ? props[key] : defaults[key];
        obj[key] = makeObservable(mapper && mapper[key] ? mapper[key](value) : value);
    }
}

export = setDefaultProperties;