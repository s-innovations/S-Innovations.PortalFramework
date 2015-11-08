


import ko = require("knockout");
import isDefined = require("../utils/isDefined");

interface koLayout {

    templateOptions(): KnockoutTemplateBindingHandlerOptions;

}



ko.virtualElements.allowedBindings["koLayout"] = true;

var old : ()=>void = ko.bindingProvider.instance["preprocessNode"];
ko.bindingProvider.instance["preprocessNode"] = function (node: HTMLElement) {
    if (node.nodeType == 8) {    /* Comments looking for <!-- koLayout : propertyname --> */
        var match = node.nodeValue.match(/^\s*koLayout\s*:([\s\S]+)/);

        if (match) {

            var c1 = document.createComment(" ko koLayout: " + match[1]),
                c2 = document.createComment(" /ko ");

            node.parentNode.insertBefore(c1, node);
            node.parentNode.replaceChild(c2, node);


            // Tell Knockout about the new nodes so that it can apply bindings to them
            return [c1, c2];
        }
    }
    if (old) {
        return old.call(this, arguments);
    }

}

ko.bindingHandlers.koLayout = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var vm = valueAccessor();
        var layout = ko.utils.unwrapObservable<koLayout>(vm);
       
        if (isDefined(layout)) {                                      
            
            return ko.bindingHandlers.template.init.apply(this, [
                element, layout.templateOptions.bind(layout,element), allBindingsAccessor, viewModel, bindingContext
            ]);
        } else {
          //Do nothing, update will handle if it was observable.
        }
    },
    update: function (element: HTMLElement, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {


        var layout = ko.utils.unwrapObservable<koLayout>(valueAccessor());

        if (isDefined(layout)) {
            
            return ko.bindingHandlers.template.update.apply(this, [
                element, layout.templateOptions.bind(layout,element), allBindingsAccessor, viewModel, bindingContext
            ]);
        } else {    
            //Clean out template
            return ko.bindingHandlers.template.update.apply(this, [
                element, function () { return { if: false } }, allBindingsAccessor, viewModel, bindingContext
            ]);
        }
    }
}


export = koLayout;