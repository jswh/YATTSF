import * as http from 'http';
import {CookieOptions} from '../helper/http'
import * as cookie from 'cookie'

export class HttpResponse {
    private content: string
    private code = 200;
    private headers: any;
    private encode = 'utf-8';

    private cookies: any;
    constructor() {
    }

    public addHeader(name:string, value:string) {
        this.headers[name] = value
    }

    public addCookie(name:string, value:string, options:CookieOptions) {
        this.cookies[name] = {
            value: value,
            options: options
        };
    }

    public setContent(content: any) {
        switch(typeof(content)) {
            case 'object':
                this.content = JSON.stringify(content);
                break;
            default:
                this.content = content.toString();
        }
    }

    public setStatusCode(code: number) {
        this.code = code;
    }

    public send(raw: http.ServerResponse) {
        raw.writeHead(this.code, this.headers);
        for (let c in this.cookies) {
            let theCookie = this.cookies[c];
            raw.setHeader('Set-Cookie', cookie.serialize(c, theCookie.value, theCookie.options));
        }
        if (this.content) {
            raw.write(this.content);
        }
        raw.end();
    }
}