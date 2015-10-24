define(["require", "exports", "../koExtensions/makeObservable"], function (require, exports, makeObservable) {
    function setDefaultProperties(obj, props, defaults) {
        for (var key in defaults) {
            obj[key] = makeObservable(props[key] || defaults[key]);
        }
    }
    return setDefaultProperties;
});
//# sourceMappingURL=setDefaultProperties.js.map