/// <reference path="../typings/globals/node/index.d.ts" />
import * as http from 'http';
import {HttpRequest} from './Request';
import {HttpResponse} from './Response';
import "reflect-metadata";
import * as router from './Router';

export class App {
    private httpServer: http.Server;

    constructor() {
        this.httpServer = http.createServer((request, response) => {
            let req = new HttpRequest(request), res = new HttpResponse(response);
            let func = router.mapping(req.method ,req.path)
            let next = () => {res.send();}
            if(!func) {
                res.setStatusCode(404);
                next();
            } else {
                func(req, res, next);
            }
        });
    }

    start() {
        this.httpServer.listen(3000, '127.0.0.1')
    }
}