
import makeObservable = require("../koExtensions/makeObservable");

function setDefaultProperties(obj: any, props, defaults) {
    for (var key in defaults) {
        obj[key] = makeObservable(props[key] || defaults[key]);
    }
}

export = setDefaultProperties;