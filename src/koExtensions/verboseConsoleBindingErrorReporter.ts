
import ko = require("knockout");


    var existing = ko.bindingProvider.instance;

    ko.bindingProvider.instance = {
        nodeHasBindings: existing.nodeHasBindings,
        getBindings: function (node, bindingContext) {
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
        }
    };
