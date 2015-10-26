/// <reference path="./koExtensions/knockoutExtensions.d.ts" />
/// <reference path="./utils/utils.d.ts" />
declare module 'si-portal-framework/koExtensions/koLayout' {
	interface koLayout {
	    templateOptions(): KnockoutTemplateBindingHandlerOptions;
	}
	export = koLayout;

}
declare module 'si-portal-framework/siPortal/siItemLayout' {
	import koLayout = require('si-portal-framework/koExtensions/koLayout'); class SIItemLayout implements koLayout {
	    private _templateName;
	    private _classes;
	    constructor(opt?: any);
	    private classRegistrations;
	    private classes;
	    protected registerClass(getter: any): void;
	    templateOptions(): {
	        name: any;
	        data: SIItemLayout;
	    };
	}
	export = SIItemLayout;

}
declare module 'si-portal-framework/siPortal/stackLayout/siStackLayoutOrientation' {
	 enum SIStackLayoutOrientation {
	    horizontal = 0,
	    vertical = 1,
	}
	export = SIStackLayoutOrientation;

}
declare module 'si-portal-framework/siPortal/siItemLayoutOptions' {
	interface siItemLayoutOptions {
	    classes?: Array<string>;
	    templateName?: string;
	}
	export = siItemLayoutOptions;

}
declare module 'si-portal-framework/siPortal/stackLayout/siStackLayoutOptions' {
	import koLayout = require('si-portal-framework/koExtensions/koLayout');
	import SIStackLayoutOrientation = require('si-portal-framework/siPortal/stackLayout/siStackLayoutOrientation');
	import siItemLayoutOptions = require('si-portal-framework/siPortal/siItemLayoutOptions');
	interface SIStackLayoutOptions extends siItemLayoutOptions {
	    elements?: Array<koLayout>;
	    orientation?: SIStackLayoutOrientation | KnockoutObservable<SIStackLayoutOrientation>;
	}
	export = SIStackLayoutOptions;

}
declare module 'si-portal-framework/siPortal/stackLayout/siStackLayout' {
	import koLayout = require('si-portal-framework/koExtensions/koLayout');
	import SIItemLayout = require('si-portal-framework/siPortal/siItemLayout');
	import SIStackLayoutOrientation = require('si-portal-framework/siPortal/stackLayout/siStackLayoutOrientation');
	import SIStackLayoutOptions = require('si-portal-framework/siPortal/stackLayout/siStackLayoutOptions'); class SIStackLayout extends SIItemLayout {
	    elements: KnockoutObservableArray<koLayout>;
	    orientation: KnockoutObservable<SIStackLayoutOrientation>;
	    constructor(options?: SIStackLayoutOptions);
	    private orientationClass();
	}
	export = SIStackLayout;

}
declare module 'si-portal-framework/siPortal/siPortalLoader' {
	 class SIPortalLoader {
	    constructor(data: any);
	}
	export = SIPortalLoader;

}
declare module 'si-portal-framework/siPortal/siPortal' {
	export import stackLayout = require('si-portal-framework/siPortal/stackLayout/siStackLayout');
	export import siPortalLoader = require('si-portal-framework/siPortal/siPortalLoader');

}
declare module 'si-portal-framework/index' {
	/// <reference path="../../src/koExtensions/knockoutExtensions.d.ts" />
	export import siPortal = require('si-portal-framework/siPortal/siPortal');

}
declare module 'si-portal-framework/koExtensions/TOGuard' {
	interface TOGuard<T, O> {
	    (o: T | O): o is T;
	}
	export = TOGuard;

}
declare module 'si-portal-framework/koExtensions/makeObservable' {
	 function makeObservable<T>(obj: T | Array<T> | KnockoutObservableArray<T> | KnockoutObservable<T>): KnockoutObservableArray<T> | KnockoutObservable<T>;
	export = makeObservable;

}
declare module 'si-portal-framework/koExtensions/requireTextObservable' {
	 function requireTextObservable(txt: any): KnockoutObservable<string>;
	export = requireTextObservable;

}
declare module 'si-portal-framework/koExtensions/stringTemplateEngine' {
	 var engine: KnockoutNativeTemplateEngine;
	export = engine;

}
declare module 'si-portal-framework/koExtensions/template' {
	 var loader: {
	    load: (name: any, req: any, load: any, config: any) => void;
	    write: (pluginName: any, moduleName: any, write: any, config: any) => void;
	};
	export = loader;

}
declare module 'si-portal-framework/siPortal/rootLayouts/webContainerLayout' {
	import koLayout = require('si-portal-framework/koExtensions/koLayout'); class WebContainerLayout implements koLayout {
	    layout: any;
	    constructor(options?: {
	        layout?;
	    });
	    templateOptions(): {
	        name: string;
	        data: WebContainerLayout;
	    };
	}
	export = WebContainerLayout;

}
declare module 'si-portal-framework/utils/constructorGuard' {
	interface constructorGuard<T, O> {
	    (o: T | O): o is T;
	}
	export = constructorGuard;

}
declare module 'si-portal-framework/utils/constructorMapper' {
	import TOGuard = require('si-portal-framework/utils/constructorGuard'); function constructorMapper<VM, VMOptions>(guard: TOGuard<VM, VMOptions>, ctor: new (p: VMOptions) => VM): (o: Array<VM | VMOptions> | VM | VMOptions) => Array<VM> | VM;
	export = constructorMapper;

}
declare module 'si-portal-framework/utils/extend' {
	 function extend(...args: Array<any>): any;
	export = extend;

}
declare module 'si-portal-framework/utils/isArray' {
	 var isArray: (arg: any) => arg is any[];
	export = isArray;

}
declare module 'si-portal-framework/utils/isDefined' {
	 function isDefined(variable: any): boolean;
	export = isDefined;

}
declare module 'si-portal-framework/utils/setDefaultProperties' {
	 function setDefaultProperties(obj: any, props: any, defaults: any, mapper?: any): void;
	export = setDefaultProperties;

}
declare module 'si-portal-framework' {
	import main = require('si-portal-framework/index');
	export = main;
}
