
import siStorage from '../siStorage/siStorage';
import {OAuthResultProperties}  from "./OAuthResult";

export default function getStoredTokens(ns : string) {
    return new siStorage<OAuthResultProperties>("oauthStore", window.sessionStorage, ns).get()
        || new siStorage<OAuthResultProperties>("oauthStore", window.localStorage, ns).get();

}

