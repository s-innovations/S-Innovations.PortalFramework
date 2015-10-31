define(["require", "exports", "../koExtensions/makeObservable"], function (require, exports, makeObservable) {
    function setDefaultProperties(obj, props, defaults, mapper) {
        for (var key in defaults) {
            var value = props[key] || defaults[key];
            obj[key] = makeObservable(mapper && mapper[key] ? mapper[key](value) : value);
        }
    }
    return setDefaultProperties;
});
//# sourceMappingURL=setDefaultProperties.js.map