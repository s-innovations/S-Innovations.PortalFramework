define(["require", "exports", "knockout"], function (require, exports, ko) {
    var existing = ko.bindingProvider.instance;
    existing.getBindings = function (node, bindingContext) {
        var bindings;
        try {
            bindings = existing.getBindings(node, bindingContext);
        }
        catch (ex) {
            if (window.console && console.log) {
                console.log("binding error", ex.message, node, bindingContext);
            }
        }
        return bindings;
    };
});
//ko.bindingProvider.instance = {
//    nodeHasBindings: existing.nodeHasBindings,
//    getBindingAccessors: existing.getBindingAccessors,
//    getBindings: function (node, bindingContext) {
//        var bindings;
//        try {
//            bindings = existing.getBindings(node, bindingContext);
//        }
//        catch (ex) {
//            if (window.console && console.log) {
//                console.log("binding error", ex.message, node, bindingContext);
//            }
//        }
//        return bindings;
//    }
//};
//ko.bindingProvider.instance["preprocessNode"] = existing["preprocessNode"];
//# sourceMappingURL=verboseConsoleBindingErrorReporter.js.map