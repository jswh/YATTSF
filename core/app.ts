/// <reference path="../typings/globals/node/index.d.ts" />
import * as http from 'http';
import {HttpRequest} from './Request';
import {HttpResponse} from './Response'
import "reflect-metadata";

export class App {
    private routers = {
        post: {
        },
        get: {
            '/': (req: HttpRequest, res: HttpResponse, next) => {res.setContent('Hello World !');next();}
        },
        default: (req: HttpRequest, res: HttpResponse, next) => {res.setStatusCode(404);next();}
    };
    private httpServer: http.Server;

    constructor() {
        this.httpServer = http.createServer((request, response) => {
            let req = new HttpRequest(request), res = new HttpResponse(response);
            let func = this.routers[request.method.toLowerCase()][req.path];
            var next = () {
                res.send();
            }
            if(!func) {
                func = this.routers.default;
            }
            if (typeof(func) == 'function') {
                func(req, res, next);
            }
        });
    }

    route(method = 'get', url:string, func: Function) {
        this.routers[method][url] = func;
    }

    start() {
        this.httpServer.listen(3000, '127.0.0.1')
    }
}