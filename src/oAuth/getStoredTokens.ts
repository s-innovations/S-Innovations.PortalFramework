
import siStorage from '../siStorage/siStorage';
import oAuthResult  from "./oAuthResult";

export default function getStoredTokens(ns : string) {
    return new siStorage<oAuthResult>("oauthStore", window.sessionStorage, ns).get()
        || new siStorage<oAuthResult>("oauthStore", window.localStorage, ns).get();

}

