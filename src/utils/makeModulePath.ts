
/// <reference path="../siPortal/extensions/startsWith.ts" />
/// <amd-dependency path="../siPortal/extensions/startsWith" />

import moduleStatic = require("module");


function makeModulePath(module: { id: string }, path: string)
{
    var root = module.id.substring(0, module.id.lastIndexOf('/'));

    if (path.startsWith("./"))
        return root + path.substr(1);

    var rootParts = root.split('/');
    var back = [];
    while (path.startsWith(".")) {
        if (path.startsWith("../")) {
            path = path.substr(3);
            if (rootParts.length) {
                rootParts.pop();
            } else {
                back.push("..");
            }

        } else if (path.startsWith("./")) {
            path = path.substr(2);
        }
    }
   

    return back.join("/") + rootParts.join("/") + ((rootParts.length + back.length) ? "/" : "") + path;

    
}
export = makeModulePath;