/// <reference path="../typings/globals/node/index.d.ts" />
import * as http from 'http';
import * as querystring from 'querystring';

export class HttpRequest {
    private raw: http.IncomingMessage
    public path: string
    public query: Object;
    public body: Object;

    constructor(req:http.IncomingMessage) {
        this.raw = req;
        let parts = this.raw.url.split('?');
        this.path = decodeURI(parts[0]);
        if (parts.length > 1) {
            this.query = querystring.parse(parts[1]);
        } else {
            this.query = {};
        }
        let body = this.raw.read();
        this.body = querystring.parse(body);
        this.body['raw'] = body;
    }
}