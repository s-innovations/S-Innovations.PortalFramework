//https://github.com/AnalyticalGraphicsInc/cesium/blob/68df3e9aa0728f26b363cd64d85e20b91fc5eb2e/Source/Core/isArray.js#L15
define(["require", "exports", "./isDefined"], function (require, exports, isDefined) {
    /**
    * Tests an object to see if it is an array.
    * @exports isArray
    *
    * @param {Object} value The value to test.
    * @returns {Boolean} true if the value is an array, false otherwise.
    */
    var isArray = Array.isArray;
    if (!isDefined(isArray)) {
        isArray = function (value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        };
    }
    return isArray;
});
//# sourceMappingURL=isArray.js.map