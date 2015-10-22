
interface KnockoutBindingHandlers {
    siLayout: KnockoutBindingHandler;
    singleClick: KnockoutBindingHandler;
}

interface KnockoutTemplateSources {
    stringTemplate: {
        prototype: KnockoutTemplateSourcesDomElement
        new (template: string): KnockoutTemplateSourcesDomElement
    };

}

interface KnockoutNativeTemplateEngine {
    makeTemplateSource(template: string | Element, doc): KnockoutTemplateSourcesDomElement;
}

interface KnockoutStatic {
    requireTextObservable: (txt: string) => KnockoutObservable<string>;

    templates: { [name: string]: string };
}

interface KnockoutBindingContext {
    $tmpCtx?: KnockoutTemplateBindingHandlerOptions;
}
interface KnockoutTemplateBindingHandlerOptions {
    /*
     the ID of an element that contains the template you wish to render - see Note 5 for how to vary this programmatically.
    */
    name?: string;
    /*
    directly pass an array of DOM nodes to use as a template. This should be a non-observable array and note that the elements will be removed from their current parent if they have one. This option is ignored if you have also passed a nonempty value for name.
    */
    nodes?: Array<Node>;
    /*
      an object to supply as the data for the template to render. If you omit this parameter, KO will look for a foreach parameter, or will fall back on using your current model object.
    */
    data?: any;
     
    /*
    if this parameter is provided, the template will only be rendered if the specified expression evaluates to true (or a true-ish value). This can be useful for preventing a null observable from being bound against a template before it is populated.
    */
    if?: any; 
    /*
    instructs KO to render the template in “foreach” mode - see Note 2 for details.
    */
    foreach?: any;
              
    /*
    when used in conjunction with foreach, defines an alias for each item being rendered - see Note 3 for details.
    */
    as?: string;

    /*
    — callback functions to be invoked against the rendered DOM elements - see Note 4
    */
    afterRender?;
    afterAdd?;
    beforeRemove?;

}