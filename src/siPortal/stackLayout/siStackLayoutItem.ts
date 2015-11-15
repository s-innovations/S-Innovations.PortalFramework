



import ko = require("knockout");
import setDefaultProperties = require("../../utils/setDefaultProperties");
import koLayout = require("../../koExtensions/koLayout");


class siStackLayoutItem implements koLayout {

    item: KnockoutObservable<koLayout>;
    private _div: HTMLDivElement;
    constructor(options: { item: koLayout }) {
        setDefaultProperties(this, options, { item: undefined });
        this._div = document.createElement("div");
        this._div.classList.add("si-stacklayout-item");
        this._div.classList.add("expand");
        this._div.dataset["bind"] = "template : itemTemplateOptions()";

    }
    itemTemplateOptions() {
        console.log(this);
        if (this.item()) {
            return this.item().templateOptions();
        }
        return { if: this.item }
    }
    templateOptions() {

        return {
            nodes: [this._div],
            data: this,
            as: "$StackLayoutItem"
        };
    }
}

export =siStackLayoutItem;

