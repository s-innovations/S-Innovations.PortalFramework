

import {OAuthClient} from "./OAuthClient";

export interface OAuthResultProperties {
    id_token: string;
    access_token: string;
    expires_in: number|string;
    scope: string;
    state: string;
    token_type: string;
    expires_at?: number;
}

function parseExpiresIn(value: string | number) {
    if (typeof value === "string")
        return parseFloat(value);
    else
        return value;
}
export class OAuthResult {


    constructor(public client: OAuthClient, data: OAuthResultProperties) {
        if (data) {

            this.id_token = data.id_token;
            this.expires_in = parseExpiresIn(data.expires_in);             
            this.scope = data.scope;
            this.state = data.state;
            this.token_type = data.token_type;
            this.access_token = data.access_token;
            this.expires_at = data.expires_at || new Date().getTime() + this.expires_in * 1000;
        }
    }

    id_token: string;
    access_token: string;
    expires_in: number;
    scope: string;
    state: string;
    token_type: string;
    expires_at: number;
}
