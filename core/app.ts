/// <reference path="../typings/globals/node/index.d.ts" />
import * as http from 'http';
import {HttpRequest} from './Request';
import {HttpResponse} from './Response'
export class App {
    private routers = {
        post: {
        },
        get: {
            '/': (req: HttpRequest, res: HttpResponse) => {res.setContent('Hello World !')}
        },
        default: (req: HttpRequest, res: HttpResponse) => {res.setStatusCode(404);}
    };
    private httpServer: http.Server;

    constructor() {
        this.httpServer = http.createServer((request, response) => {
            let req = new HttpRequest(request), res = new HttpResponse(response);
            let func = this.routers[request.method.toLowerCase()][req.getPath()];
            if(!func) {
                func = this.routers.default;
            }
            if (typeof(func) == 'function') {
                func(req, res);
            }
            res.send();
        });
    }

    route(method = 'get', url:string, func: Function) {
        this.routers[method][url] = func;
    }

    start() {
        this.httpServer.listen(3000, '127.0.0.1')
    }
}