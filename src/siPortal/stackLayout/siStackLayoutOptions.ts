
import koLayout = require("../../koExtensions/koLayout");
import SIStackLayoutOrientation = require("./siStackLayoutOrientation");
import siItemLayoutOptions = require("../siItemLayoutOptions");

interface SIStackLayoutOptions extends siItemLayoutOptions {
    elements?: Array<koLayout>;
    orientation?: SIStackLayoutOrientation | KnockoutObservable<SIStackLayoutOrientation>;
}

export = SIStackLayoutOptions;