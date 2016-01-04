/// <reference path="./koExtensions/knockoutExtensions.d.ts" />
/// <reference path="./utils/utils.d.ts" />
declare module 'si-portal-framework/koExtensions/koLayout' {
	interface koLayout {
	    templateOptions(): KnockoutTemplateBindingHandlerOptions;
	}
	export = koLayout;

}
declare module 'si-portal-framework/koExtensions/makeObservable' {
	 function makeObservable<T>(obj: T | Array<T> | KnockoutObservableArray<T> | KnockoutObservable<T>): KnockoutSubscribable<T> | KnockoutSubscribable<T[]>;
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
declare module 'si-portal-framework/oAuth/implicitRequestOptions' {
	interface implicitRequestOptions {
	    responseType: string;
	    prompt?: string;
	    login_hint?: string;
	    acr_values?: string;
	    isSilence?: boolean;
	}
	export = implicitRequestOptions;

}
declare module 'si-portal-framework/oAuth/oAuthClient' {
	import * as Q from "q"; import oAuthResult from 'si-portal-framework/oAuth/oAuthResult';
	import implicitRequestOptions = require('si-portal-framework/oAuth/implicitRequestOptions');
	export default class oAuthClient {
	    url: any;
	    constructor(url?: any);
	    setUrl(url: any): void;
	    createSilentImplicitFlow(clientid: any, callback: any, scope: any, responseType?: string): Q.Promise<{}>;
	    createImplicitFlowRequest(clientid: any, callback: any, scope: any, options: implicitRequestOptions): {
	        url: string;
	        state: string;
	        nonce: string;
	    };
	    parseResult(queryStringOrParams: any): oAuthResult;
	}

}
declare module 'si-portal-framework/oAuth/oAuthResult' {
	 import oAuthClient from 'si-portal-framework/oAuth/oAuthClient';
	export default class oAuthResult {
	    client: oAuthClient;
	    constructor(client: oAuthClient, data: any);
	    id_token: string;
	    access_token: string;
	    expires_in: number;
	    scope: string;
	    state: string;
	    token_type: string;
	    expires_at: number;
	}

}
declare module 'si-portal-framework/oAuth/getStoredTokens' {
	 import oAuthResult from 'si-portal-framework/oAuth/oAuthResult';
	export default function getStoredTokens(ns: string): oAuthResult;

}
declare module 'si-portal-framework/oAuth/setToken' {
	 import oAuthResult from 'si-portal-framework/oAuth/oAuthResult';
	export default function setToken(ns: string, result: oAuthResult): void;

}
declare module 'si-portal-framework/oAuth/oAuthModule' {
	 import oAuthClient from 'si-portal-framework/oAuth/oAuthClient'; import oAuthResult from 'si-portal-framework/oAuth/oAuthResult'; import getStoredTokens from 'si-portal-framework/oAuth/getStoredTokens'; import setToken from 'si-portal-framework/oAuth/setToken';
	export { oAuthClient, oAuthResult, getStoredTokens, setToken };

}
interface String {
    startsWith(str: any): boolean;
}
declare module 'si-portal-framework/siPortal/rootLayouts/webContainerLayout' {
	import koLayout = require('si-portal-framework/koExtensions/koLayout'); class WebContainerLayout implements koLayout {
	    layout: any;
	    constructor(options?: {
	        layout?;
	    });
	    templateOptions(): {
	        name: string;
	        data: any;
	    };
	}
	export = WebContainerLayout;

}
declare module 'si-portal-framework/siPortal/siItemLayoutOptions' {
	interface siItemLayoutOptions {
	    classes?: Array<string>;
	    templateName?: string;
	    contextName?: string;
	}
	export = siItemLayoutOptions;

}
declare module 'si-portal-framework/siPortal/siItemLayout' {
	import koLayout = require('si-portal-framework/koExtensions/koLayout');
	import siItemLayoutOptions = require('si-portal-framework/siPortal/siItemLayoutOptions'); class SIItemLayout implements koLayout {
	    private _contextName;
	    private _templateName;
	    private _classes;
	    constructor(opt?: siItemLayoutOptions);
	    private classRegistrations;
	    private classes;
	    protected registerClass(getter: any): void;
	    templateOptions(): {
	        name: any;
	        data: any;
	        as: any;
	    };
	}
	export = SIItemLayout;

}
declare module 'si-portal-framework/siPortal/siPortalLoader' {
	 class SIPortalLoader {
	    hash: KnockoutObservable<string>;
	    route: KnockoutObservable<Array<string>>;
	    params: KnockoutObservable<any>;
	    constructor(data: any);
	    protected onHashChange(): void;
	    initialize(): void;
	}
	export = SIPortalLoader;

}
declare module 'si-portal-framework/siPortal/stackLayout/siStackLayoutOrientation' {
	 enum SIStackLayoutOrientation {
	    horizontal = 0,
	    vertical = 1,
	}
	export = SIStackLayoutOrientation;

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
declare module 'si-portal-framework/siPortal/stackLayout/siStackLayoutItem' {
	import koLayout = require('si-portal-framework/koExtensions/koLayout'); class siStackLayoutItem implements koLayout {
	    item: KnockoutObservable<koLayout>;
	    private _div;
	    constructor(options: {
	        item: koLayout;
	    });
	    itemTemplateOptions(): KnockoutTemplateBindingHandlerOptions;
	    templateOptions(): {
	        nodes: HTMLDivElement[];
	        data: any;
	        as: string;
	    };
	}
	export = siStackLayoutItem;

}
declare module 'si-portal-framework/siStorage/siStorage' {
	export default class siStorage<T> {
	    private name;
	    private store;
	    private ns;
	    constructor(name: string, store: Storage, ns?: string);
	    get(): T;
	    set(value?: T): void;
	}

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
	 var isArray: {
	    (arg: any): arg is any[];
	    <T>(arg: any): arg is T[];
	};
	export = isArray;

}
declare module 'si-portal-framework/utils/isDefined' {
	 function isDefined(variable: any): boolean;
	export = isDefined;

}
declare module 'si-portal-framework/utils/makeModulePath' {
	 function makeModulePath(module: {
	    id: string;
	}, path: string): string;
	export = makeModulePath;

}
declare module 'si-portal-framework/utils/setDefaultProperties' {
	 function setDefaultProperties(obj: any, props: any, defaults: any, mapper?: any): void;
	export = setDefaultProperties;

}
