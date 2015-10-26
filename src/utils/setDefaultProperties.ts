
import makeObservable = require("../koExtensions/makeObservable");

function setDefaultProperties(obj: any, props, defaults, mapper?) {
    for (var key in defaults) {
        
        var value = props[key] || defaults[key];
        obj[key] = makeObservable(mapper && mapper[key] ? mapper[key](value) : value);
    }
}

export = setDefaultProperties;