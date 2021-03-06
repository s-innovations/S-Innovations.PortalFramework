
import ko = require("knockout");
import koLayout = require("../koExtensions/koLayout");
import siItemLayoutOptions = require("./siItemLayoutOptions");


class SIItemLayout implements koLayout {
 
    private _contextName;
    private _templateName;
    private _classes: Array<string>;
    constructor(opt?: siItemLayoutOptions) {
        this._templateName = opt.templateName;
        this._contextName = opt.contextName;
        this._classes = opt.classes || [];
    }

    private classRegistrations = [];
    private classes = ko.computed({
        read: () => {
            console.log("Generating Classes List");
            var value = this._classes.slice(0);
            for (var i in this.classRegistrations) {
                value.push(this.classRegistrations[i]());
            }
            return value.join(" ");
        },
        deferEvaluation: true,
    });

    protected registerClass(getter) {
        var value = ko.computed({
            read: getter,
            deferEvaluation: true,
            owner : this,
        //disposeWhenNodeIsRemoved:el
        });

        this.classRegistrations.push(value);
    }

    

    
    templateOptions() {

        return {
            name: this._templateName,
            data: <any>this,
            as: this._contextName

        };
    }

}
export = SIItemLayout;