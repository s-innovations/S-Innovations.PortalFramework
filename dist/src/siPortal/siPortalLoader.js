/// <amd-dependency path="../koExtensions/koLayout" />
define(["require", "exports", "knockout", "../koExtensions/koLayout"], function (require, exports, ko) {
    var SIPortalLoader = (function () {
        function SIPortalLoader(data) {
            setTimeout(function () {
                ko.applyBindings(data.rootLayout);
            });
        }
        return SIPortalLoader;
    })();
    return SIPortalLoader;
});
//# sourceMappingURL=siPortalLoader.js.map