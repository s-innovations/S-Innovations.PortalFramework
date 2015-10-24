/// <amd-dependency path="template!./templates/WebContainerLayoutTemplate.html"/>
define(["require", "exports", "template!./templates/WebContainerLayoutTemplate.html"], function (require, exports) {
    /*
     * A fixed web-container layout inspired from the new azure portal, portal.azure.com.
     *
     */
    var WebContainerLayout = (function () {
        function WebContainerLayout(options) {
            this.layout = options.layout;
        }
        WebContainerLayout.prototype.templateOptions = function () {
            return {
                name: "WebContainerLayoutTemplate",
                data: this
            };
        };
        return WebContainerLayout;
    })();
    return WebContainerLayout;
});
//# sourceMappingURL=webContainerLayout.js.map