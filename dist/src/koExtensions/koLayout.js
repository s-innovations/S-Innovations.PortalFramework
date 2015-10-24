define(["require", "exports", "knockout"], function (require, exports, ko) {
    ko.virtualElements.allowedBindings["koLayout"] = true;
    var old = ko.bindingProvider.instance["preprocessNode"];
    ko.bindingProvider.instance["preprocessNode"] = function (node) {
        if (node.nodeType == 8) {
            var match = node.nodeValue.match(/^\s*koLayout\s*:([\s\S]+)/);
            if (match) {
                var c1 = document.createComment(" ko koLayout: " + match[1]), c2 = document.createComment(" /ko ");
                node.parentNode.insertBefore(c1, node);
                node.parentNode.replaceChild(c2, node);
                // Tell Knockout about the new nodes so that it can apply bindings to them
                return [c1, c2];
            }
        }
        if (old) {
            return old.call(this, arguments);
        }
    };
    ko.bindingHandlers.koLayout = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var vm = valueAccessor();
            var layout = ko.utils.unwrapObservable(vm);
            bindingContext.$tmpCtx = layout.templateOptions();
            return ko.bindingHandlers.template.init.apply(this, [
                element, function () { return bindingContext.$tmpCtx; }, allBindingsAccessor, viewModel, bindingContext
            ]);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var layout = ko.utils.unwrapObservable(valueAccessor());
            if (layout === null)
                return;
            return ko.bindingHandlers.template.update.apply(this, [
                element, function () { return bindingContext.$tmpCtx; }, allBindingsAccessor, viewModel, bindingContext
            ]);
        }
    };
});
//# sourceMappingURL=koLayout.js.map