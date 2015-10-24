define(["require", "exports", "knockout"], function (require, exports, ko) {
    ko.bindingHandlers.singleClick = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = valueAccessor(), delay = 100, clickTimeout = true;
            $(element).click(function () {
                if (clickTimeout) {
                    clickTimeout = false;
                    handler.call(viewModel, arguments);
                    setTimeout(function () {
                        clickTimeout = true;
                    }, delay);
                }
            });
        }
    };
});
//# sourceMappingURL=singleClickBindingHandler.js.map