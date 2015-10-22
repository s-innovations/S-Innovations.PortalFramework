/// <amd-dependency path="template!./templates/helloWorldLayout.html"/>
define(["require", "exports", "template!./templates/helloWorldLayout.html"], function (require, exports) {
    var helloWorldLayout = (function () {
        function helloWorldLayout() {
        }
        helloWorldLayout.prototype.templateOptions = function () {
            return {
                name: "helloWorldLayout",
                data: this
            };
        };
        return helloWorldLayout;
    })();
    return helloWorldLayout;
});
