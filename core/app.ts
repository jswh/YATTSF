import * as http from 'http';
import {HttpRequest} from './Request';
import {HttpResponse} from './Response';
import "reflect-metadata";
import {Router} from './Router';

export class App {
    private httpServer: http.Server;
    private controllers = [];
    constructor() {
        this.httpServer = http.createServer(async (request, response) => {
            let req = new HttpRequest(request), res = new HttpResponse(response);
            let func = Router.mapping(req.method ,req.path)
            if(!func) {
                res.setStatusCode(404);
            } else {
                let data = await func(req);
                res.setContent(data);
            }
            res.send();
        });
    }

    start() {
        this.httpServer.listen(3000, '127.0.0.1')
    }

    register(controllers) {
        for(let controller of controllers) {
            this.controllers.push(controller.Controller());
        }
    }
}