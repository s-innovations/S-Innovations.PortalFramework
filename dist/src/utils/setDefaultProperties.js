define(["require", "exports", "../koExtensions/makeObservable", "./isDefined"], function (require, exports, makeObservable, isDefined) {
    function setDefaultProperties(obj, props, defaults, mapper) {
        for (var key in defaults) {
            var value = isDefined(props[key]) ? props[key] : defaults[key];
            obj[key] = makeObservable(mapper && mapper[key] ? mapper[key](value) : value);
        }
    }
    return setDefaultProperties;
});
//# sourceMappingURL=setDefaultProperties.js.map