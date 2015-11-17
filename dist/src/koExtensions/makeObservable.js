define(["require", "exports", "knockout", "../utils/isArray"], function (require, exports, ko, isArray) {
    function makeObservable(obj) {
        if (ko.isSubscribable(obj)) {
            return obj;
        }
        else {
            if (isArray(obj)) {
                return ko.observableArray(obj);
            }
            else {
                return ko.observable(obj);
            }
        }
    }
    return makeObservable;
});
//# sourceMappingURL=makeObservable.js.map