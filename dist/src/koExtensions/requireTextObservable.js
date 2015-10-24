define(["require", "exports", "knockout"], function (require, exports, ko) {
    function requireTextObservable(txt) {
        var value = ko.observable("");
        require(["text!" + txt], function (svg) {
            value(svg);
        });
        return value;
    }
    ;
    ko.requireTextObservable = requireTextObservable;
    return requireTextObservable;
});
//# sourceMappingURL=requireTextObservable.js.map