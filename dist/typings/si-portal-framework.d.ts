/// <reference path="./koExtensions/knockoutExtensions.d.ts" />
/// <reference path="./utils/utils.d.ts" />
declare module 'si-portal-framework/appBuilder/compose' {
	/**
	 * Create a function to invoke all passed middleware functions
	 * with a single argument and context
	 * @param {...Array<Function>} middleware, groups of middleware functions
	 * @return {Function} Invoke the middleware pipeline
	 */
	export function compose(...middleware: any[]): any;

}
declare module 'si-portal-framework/appBuilder/AppBuilder' {
	 import {compose} from 'si-portal-framework/appBuilder/compose';
	export interface AppEnvironmnet {
	    hash: string;
	    originalHash: string;
	    route: string[];
	    params: string;
	    [key: string]: any;
	}
	export interface AppFunc {
	    (env: AppEnvironmnet): void;
	}
	export interface Middleware {
	    (env: AppEnvironmnet, next: AppFunc): void | Q.Promise<void>;
	}
	export class AppBuilder<T extends AppEnvironmnet> {
	    private middleware;
	    constructor();
	    build(): any;
	    use(mw: any): this;
	}
	export default function <T extends AppEnvironmnet>(): AppBuilder<T>;
	export { compose };

}
declare module 'si-portal-framework/koExtensions/koLayout' {
	interface koLayout {
	    templateOptions(element?: HTMLElement): KnockoutTemplateBindingHandlerOptions;
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
declare module 'si-portal-framework/oAuth/OAuthResult' {
	 import {OAuthClient} from 'si-portal-framework/oAuth/OAuthClient';
	export interface OAuthRequestState {
	    state: string;
	}
	export interface OAuthResultProperties extends OAuthRequestState {
	    id_token: string;
	    access_token: string;
	    expires_in: number | string;
	    scope: string;
	    token_type: string;
	    expires_at?: number;
	}
	export class OAuthResult {
	    client: OAuthClient;
	    constructor(client: OAuthClient, data?: OAuthRequestState | OAuthResultProperties);
	    id_token: string;
	    access_token: string;
	    expires_in: number;
	    scope: string;
	    state: string;
	    token_type: string;
	    expires_at: number;
	}

}
declare module 'si-portal-framework/oAuth/OAuthClient' {
	 import {OAuthResult, OAuthResultProperties} from 'si-portal-framework/oAuth/OAuthResult';
	export interface ImplicitRequestOptions {
	    responseType: string;
	    prompt?: string;
	    login_hint?: string;
	    acr_values?: string;
	    isSilence?: boolean;
	}
	export interface ImplicitRequestError {
	}
	export class OAuthClient {
	    url: any;
	    constructor(url?: any);
	    setUrl(url: any): void;
	    createSilentImplicitFlow(clientid: any, callback: any, scope: any, responseType?: string): Q.Promise<OAuthResultProperties>;
	    createImplicitFlowRequest(clientid: any, callback: string, scope: any, options: ImplicitRequestOptions): {
	        url: string;
	        state: string;
	        nonce: string;
	    };
	    parseResult(queryStringOrParams: string | OAuthResultProperties): OAuthResult;
	}

}
declare module 'si-portal-framework/oAuth/OAuthMiddleware' {
	 import {AppEnvironmnet, AppFunc} from 'si-portal-framework/appBuilder/AppBuilder';
	export interface OAuthUser {
	    handleAuthorizationCallback(params: string): any;
	    clearCache(): void;
	}
	export interface OAuthLoader {
	    cleanUpHash(): void;
	}
	export interface OAuthAppEnvironment<TUser extends OAuthUser, TLoader extends OAuthLoader> extends AppEnvironmnet {
	    user: TUser;
	    loader: TLoader;
	}
	export function OAuthMiddleware<TUser extends OAuthUser, TLoader extends OAuthLoader>(envOrOptions: OAuthAppEnvironment<TUser, TLoader> | any, envOrNext: OAuthAppEnvironment<TUser, TLoader> | AppFunc, nextOrnull: AppFunc | void): void;

}
declare module 'si-portal-framework/oAuth/getStoredTokens' {
	 import {OAuthResultProperties} from 'si-portal-framework/oAuth/OAuthResult';
	export default function getStoredTokens(ns: string): OAuthResultProperties;

}
declare module 'si-portal-framework/oAuth/setToken' {
	 import {OAuthResult} from 'si-portal-framework/oAuth/OAuthResult';
	export default function setToken(ns: string, result: OAuthResult): void;

}
declare module 'si-portal-framework/oAuth/OAuthModule' {
	 import {OAuthClient} from 'si-portal-framework/oAuth/OAuthClient'; import {OAuthResult} from 'si-portal-framework/oAuth/OAuthResult'; import getStoredTokens from 'si-portal-framework/oAuth/getStoredTokens'; import setToken from 'si-portal-framework/oAuth/setToken';
	export { OAuthClient, OAuthResult, getStoredTokens, setToken };

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
	import koLayout = require('si-portal-framework/koExtensions/koLayout'); import {Middleware, AppFunc, AppEnvironmnet} from 'si-portal-framework/appBuilder/AppBuilder'; class SIPortalLoader {
	    hash: KnockoutObservable<string>;
	    route: KnockoutObservable<Array<string>>;
	    params: KnockoutObservable<any>;
	    rootLayout: KnockoutObservable<koLayout>;
	    protected middlewares: Array<Middleware>;
	    protected app: AppFunc;
	    constructor(data?: {
	        rootLayout?: koLayout;
	    });
	    protected createAppEnvironment(): AppEnvironmnet;
	    protected onHashChange(): void;
	    initialize(): void;
	    private skipNextHashChange;
	    cleanUpHash(): void;
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
