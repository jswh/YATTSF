import * as http from 'http';
import * as querystring from 'querystring';
import * as cookie from 'cookie';

export class HttpRequest {
    private raw: http.IncomingMessage
    public path: string
    public query: any = {};
    public body: any;
    public method: string | undefined;
    public cookie: any = {};

    constructor(req:http.IncomingMessage, body:string) {
        this.raw = req;
        this.method = req.method;
        if (this.raw.url !== undefined) {
            let parts = this.raw.url.split('?');
            this.path = decodeURI(parts[0]);
            if (parts.length > 1) {
                this.query = querystring.parse(parts[1]);
            }
        }
        this.body = querystring.parse(body);
        this.body['raw'] = body;
        this.cookie = cookie.parse(this.getHeader('cookie') || '');
    }

    getHeader(name: string): string | undefined {
        return this.raw.headers[name];
    }
}