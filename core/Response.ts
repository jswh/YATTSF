import * as http from 'http';
import {CookieOptions} from '../helper/http'
import * as cookie from 'cookie'
import {View} from './View'

export class HttpResponse {
    private content: any;
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
        this.content = content;

        return this;
    }

    public setStatusCode(code: number): HttpResponse {
        this.code = code;

        return this;
    }

    async send(raw: http.ServerResponse) {
        for (let c in this.cookies) {
            let theCookie = this.cookies[c];
            raw.setHeader('Set-Cookie', cookie.serialize(c, theCookie.value, theCookie.options));
        }
        raw.writeHead(this.code, this.headers);
        if (this.content) {
            if (this.content instanceof View) {
                let html = await this.content.render()
                raw.write(html)
            } else {
                raw.write(typeof(this.content) == 'string' ? this.content : JSON.stringify(this.content))
            }
        }
        raw.end();
    }
}

export const abort = (code:any, reason:any = '') => {
    let res = new HttpResponse()
    res.setStatusCode(code);
    res.setContent(reason);
    return [{}, res];
}