

/// <amd-dependency path="template!./templates/StackLayoutTemplate.html"/>

import ko = require("knockout");
import setDefaultProperties = require("../../utils/setDefaultProperties");
import koLayout = require("../../koExtensions/koLayout");
import SIItemLayout = require("../siItemLayout");
import SIStackLayoutOrientation = require("./siStackLayoutOrientation");
import SIStackLayoutOptions = require("./siStackLayoutOptions");
import extend = require("../../utils/extend");


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