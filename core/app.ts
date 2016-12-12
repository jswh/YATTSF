import * as http from 'http';
import {HttpRequest} from './Request';
import {HttpResponse} from './Response';
import "reflect-metadata";
import {Router} from './Router';
import {createConnection} from 'typeorm'

export class App {
    private httpServer: http.Server;
    private controllers = [];
    constructor() {
        this.httpServer = http.createServer(async (request, response) => {
            let body = "";
            request.on('data', (chunk) => {
                body = body.concat(chunk.toString())
            });
            request.on('end', () => {
                this.fire_request(request, response, body)
            })
        });
    }
    async fire_request(request:http.IncomingMessage, response:http.ServerResponse, body:string) {
        let req = new HttpRequest(request, body), res = new HttpResponse();
        if (req.method == undefined) {
            res.setStatusCode(405);
        } else {
            let func = Router.mapping(req.method ,req.path)
            if(!func) {
                res.setStatusCode(404);
            } else {
                try {
                    let data = await func(req);
                    if (typeof(data) == 'string') {
                        res.setContent(data);
                    } else if (data instanceof HttpResponse) {
                        res = data;
                    } else {
                        res.addHeader('Content-Type', 'application/json')
                        res.setContent(JSON.stringify(data));
                    }
                } catch (e) {
                    console.log(e)
                    res.setStatusCode(500);
                }
            }
        }
        res.send(response);
    }
    async initDatabase() {
        await createConnection();
    }
    async start() {
        await this.initDatabase()
        this.httpServer.listen(3000, '127.0.0.1')
    }
}