/// <reference path="../typings/globals/node/index.d.ts" />
import * as http from 'http';

export class HttpResponse {
    private raw: http.ServerResponse
    private content: string
    private code = 200;
    private headers = {"content-type": "application/json"}
    private encode = 'utf-8';

    constructor(req:http.ServerResponse) {
        this.raw = req;
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

    public send() {
        this.raw.writeHead(this.code, this.headers);
        if (this.content) {
            this.raw.write(this.content);
        }
        this.raw.end();
    }
}