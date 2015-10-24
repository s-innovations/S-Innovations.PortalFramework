define(["require", "exports", "knockout"], function (require, exports, ko) {
    var SIItemLayout = (function () {
        function SIItemLayout(opt) {
            var _this = this;
            this.classRegistrations = [];
            this.classes = ko.computed({
                read: function () {
                    console.log("Generating Classes List");
                    var value = _this._classes.slice(0);
                    for (var i in _this.classRegistrations) {
                        value.push(_this.classRegistrations[i]());
                    }
                    return value.join(" ");
                },
                deferEvaluation: true,
            });
            this._templateName = opt.templateName;
            this._classes = opt.classes || [];
        }
        SIItemLayout.prototype.registerClass = function (getter) {
            var value = ko.computed({
                read: getter,
                deferEvaluation: true,
                owner: this,
            });
            this.classRegistrations.push(value);
        };
        SIItemLayout.prototype.templateOptions = function () {
            return {
                name: this._templateName,
                data: this,
            };
        };
        return SIItemLayout;
    })();
    return SIItemLayout;
});
//# sourceMappingURL=siItemLayout.js.map