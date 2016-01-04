import siStorage from '../siStorage/siStorage';
import oAuthResult  from "./oAuthResult";

export default function setToken(ns :string, result: oAuthResult) {
    var oauthStore = new siStorage<oAuthResult>("oauthStore", window.sessionStorage, ns);
    oauthStore.set(result);
}