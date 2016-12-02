/// <reference path="../typings/globals/node/index.d.ts" />
import * as http from 'http';
export class RequestHelper {
    raw: http.IncomingMessage

    constructor(req:http.IncomingMessage) {
        this.raw = req;
    }

    getPath(): string {
        return decodeURI(this.raw.url.split('?')[0]);
    }
}