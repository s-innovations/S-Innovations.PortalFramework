
/// <amd-dependency path="template!./templates/WebContainerLayoutTemplate.html"/>

import koLayout = require("../../koExtensions/koLayout");

/*
 * A fixed web-container layout inspired from the new azure portal, portal.azure.com.
 *
 */
class WebContainerLayout implements koLayout {

    layout;

    constructor(options?: { layout?}) {
      
        this.layout = options.layout;

    }

    templateOptions() {

        return {
            name: "WebContainerLayoutTemplate",
            data: this

        };
    }



}

export = WebContainerLayout;