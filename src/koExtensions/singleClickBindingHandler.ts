
import ko = require("knockout");

ko.bindingHandlers.singleClick = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var handler :()=>void = valueAccessor(),
            delay = 100,
            clickTimeout = true;

        element.addEventListener('click', function () {
            if (clickTimeout) {
                clickTimeout = false;
                handler.apply(viewModel, arguments);
                setTimeout(function () {
                    clickTimeout = true;
                }, delay);
            }
        },true);
    }
};

