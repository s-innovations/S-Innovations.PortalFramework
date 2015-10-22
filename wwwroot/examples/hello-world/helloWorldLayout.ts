
/// <amd-dependency path="template!./templates/helloWorldLayout.html"/>

import SILayout = require("src/siPortal/siLayout");

class helloWorldLayout implements SILayout {

    templateOptions() {

        return {
            name: "helloWorldLayout",
            data: this

        };
    }
    
}

export = helloWorldLayout;