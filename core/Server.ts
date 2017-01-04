import * as http from 'http';
import {HttpRequest} from './Request';
import {HttpResponse} from './Response';
import {Router} from './Router';
import 'reflect-metadata'

export class Server {
    private httpServer: http.Server;
    private controllers = [];

    constructor() {
        this.httpServer = http.createServer(async (request:http.IncomingMessage, response:http.ServerResponse) => {
            let body = "";
            request.on('data', (chunk) => {
                body = body.concat(chunk.toString())
            });
            request.on('end', () => {
                this.fireRequest(request, response, body)
            })
        });
    }

    async fireRequest(request:http.IncomingMessage, response:http.ServerResponse, body:string) {
        let req = new HttpRequest(request, body), res = new HttpResponse();
        if (req.method == undefined) {
            res.setStatusCode(405);
        } else {
            let routeResult = Router.mapping(req.method ,req.path)
            if(!routeResult) {
                res.setStatusCode(404);
            } else {
                try {
                    routeResult.matches.shift();
                    req.pathParams = routeResult.matches;
                    [req, res] = await routeResult.handler(req, res);
                } catch (e) {
                    res = new HttpResponse();
                    res.setStatusCode(500);
                }
            }
        }
        res.send(response);
    }

    async start(port: number, host: string) {
        this.httpServer.listen(port, host)
    }
}