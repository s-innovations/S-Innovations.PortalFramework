

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../dist/typings/si-portal-framework.d.ts" />

import makeModulePath = require("si-portal-framework/utils/makeModulePath");

describe("makeModulePathSuite", function () {
    it("testing makeModulePath with relative paths", function () {

        expect(makeModulePath({ id: "ns1/ns2/class1" }, "./relative")).toBe("ns1/ns2/relative");
        expect(makeModulePath({ id: "ns1/ns2/class1" }, "../relative")).toBe("ns1/relative");
        expect(makeModulePath({ id: "ns1/ns2/class1" }, "../../relative")).toBe("relative");
        expect(makeModulePath({ id: "ns1/ns2/class1" }, "../../../relative")).toBe("../relative");
  });
});




