/// <amd-dependency path="template!./templates/StackLayoutTemplate.html"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../../utils/setDefaultProperties", "../siItemLayout", "./siStackLayoutOrientation", "../../utils/extend", "template!./templates/StackLayoutTemplate.html"], function (require, exports, setDefaultProperties, SIItemLayout, SIStackLayoutOrientation, extend) {
    var SIStackLayoutOptionsDefaults = {
        elements: [],
        orientation: SIStackLayoutOrientation.horizontal
    };
    var SIStackLayout = (function (_super) {
        __extends(SIStackLayout, _super);
        function SIStackLayout(options) {
            if (options === void 0) { options = {}; }
            _super.call(this, extend(options, {
                templateName: "StackLayoutTemplate"
            }));
            setDefaultProperties(this, options, SIStackLayoutOptionsDefaults);
            this.registerClass(this.orientationClass);
        }
        ;
        SIStackLayout.prototype.orientationClass = function () {
            switch (this.orientation()) {
                case SIStackLayoutOrientation.horizontal:
                    return "si-stacklayout-horizontal";
                case SIStackLayoutOrientation.vertical:
                    return "si-stacklayout-vertical";
            }
        };
        ;
        return SIStackLayout;
    })(SIItemLayout);
    return SIStackLayout;
});
//# sourceMappingURL=siStackLayout.js.map