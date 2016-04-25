import siStorage from '../siStorage/siStorage';
import {OAuthResult}  from "./OAuthResult";

export default function setToken(ns: string, result: OAuthResult) {
    var oauthStore = new siStorage<OAuthResult>("oauthStore", window.sessionStorage, ns);
    oauthStore.set(result);
}