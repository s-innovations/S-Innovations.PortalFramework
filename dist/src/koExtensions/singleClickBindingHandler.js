define(["require", "exports", "knockout"], function (require, exports, ko) {
    ko.bindingHandlers.singleClick = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handler = valueAccessor(), delay = 100, clickTimeout = true;
            element.addEventListener('click', function () {
                if (clickTimeout) {
                    clickTimeout = false;
                    handler.call(viewModel, arguments);
                    setTimeout(function () {
                        clickTimeout = true;
                    }, delay);
                }
            }, true);
        }
    };
});
//# sourceMappingURL=singleClickBindingHandler.js.map