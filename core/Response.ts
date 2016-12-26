import * as http from 'http';
import {CookieOptions} from '../helper/http'
import * as cookie from 'cookie'

export class HttpResponse {
    private content: string = '';
    private code = 200;
    private headers: any = {};
    private encode = 'utf-8';

    private cookies: any = {};
    constructor() {
    }

    public addHeader(name:string, value:string): HttpResponse {
        this.headers[name] = value

        return this;
    }

    public addCookie(name:string, value:string, options:CookieOptions = {}): HttpResponse {
        this.cookies[name] = {
            value: value,
            options: options
        };

        return this;
    }

    public setContent(content: any): HttpResponse {
        switch(typeof(content)) {
            case 'object':
                this.content = JSON.stringify(content);
                break;
            default:
                this.content = content.toString();
        }

        return this;
    }

    public setStatusCode(code: number): HttpResponse {
        this.code = code;

        return this;
    }

    public send(raw: http.ServerResponse) {
        for (let c in this.cookies) {
            let theCookie = this.cookies[c];
            raw.setHeader('Set-Cookie', cookie.serialize(c, theCookie.value, theCookie.options));
        }
        raw.writeHead(this.code, this.headers);
        if (this.content) {
            raw.write(this.content);
        }
        raw.end();
    }
}

export const abort = (code:any) => {
    let res = new HttpResponse()
    res.setStatusCode(code);
    return res;
}