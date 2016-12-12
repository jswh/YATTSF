import * as http from 'http';

export class HttpResponse {
    private content: string
    private code = 200;
    private headers: any;
    private encode = 'utf-8';

    constructor() {
    }

    public addHeader(name:string, value:string) {
        this.headers[name] = value
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
        if (this.content) {
            raw.write(this.content);
        }
        raw.end();
    }
}