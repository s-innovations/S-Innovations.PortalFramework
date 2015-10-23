

/// <amd-dependency path="template!./templates/StackLayoutTemplate.html"/>

import ko = require("knockout");
import setDefaultProperties = require("utils/setDefaultProperties");
import koLayout = require("koExtensions/koLayout");
import SIItemLayout = require("siPortal/siItemLayout");
import SIStackLayoutOrientation = require("./SIStackLayoutOrientation");
import SIStackLayoutOptions = require("./SIStackLayoutOptions");
import classDecorator = require("../decorators/classDecorator");
import extend = require("utils/extend");


function test(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<()=>string>) {
  

    console.log(this);
    console.log(arguments);

    console.log(descriptor.value);
    //target.classes = ko.computed({
    //    read: descriptor.get,
    //    deferEvaluation: true
    //    //disposeWhenNodeIsRemoved:el
    //});

    target.classes = ko.observable("a");
  
    
}

const SIStackLayoutOptionsDefaults: SIStackLayoutOptions = {
    elements: [],
    orientation: SIStackLayoutOrientation.horizontal    
};

class SIStackLayout extends SIItemLayout {

    elements: KnockoutObservableArray<koLayout>;
    orientation: KnockoutObservable<SIStackLayoutOrientation>;

    constructor(options: SIStackLayoutOptions = {}) {
        super(extend(options, {
            templateName: "StackLayoutTemplate"
        }));
        setDefaultProperties(this, options, SIStackLayoutOptionsDefaults);
        this.registerClass(this.orientationClass);
    };

    
    private orientationClass() {
        switch (this.orientation()) {
            case SIStackLayoutOrientation.horizontal:
                return "si-stacklayout-horizontal";
            case SIStackLayoutOrientation.vertical:
                return "si-stacklayout-vertical";
        }
    };
  
}

export =SIStackLayout;