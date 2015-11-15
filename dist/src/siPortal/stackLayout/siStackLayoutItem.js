define(["require", "exports", "../../utils/setDefaultProperties"], function (require, exports, setDefaultProperties) {
    var siStackLayoutItem = (function () {
        function siStackLayoutItem(options) {
            setDefaultProperties(this, options, { item: undefined });
            this._div = document.createElement("div");
            this._div.classList.add("si-stacklayout-item");
            this._div.classList.add("expand");
            this._div.dataset["bind"] = "template : itemTemplateOptions()";
        }
        siStackLayoutItem.prototype.itemTemplateOptions = function () {
            console.log(this);
            if (this.item()) {
                return this.item().templateOptions();
            }
            return { if: this.item };
        };
        siStackLayoutItem.prototype.templateOptions = function () {
            return {
                nodes: [this._div],
                data: this,
                as: "$StackLayoutItem"
            };
        };
        return siStackLayoutItem;
    })();
    return siStackLayoutItem;
});
//# sourceMappingURL=siStackLayoutItem.js.map