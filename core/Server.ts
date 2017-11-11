import { Router } from './Router';
import * as http from 'http';
import * as restify from 'restify'

export class Server {
    private httpServer: restify.Server
    private router: Router

    constructor() {
        this.httpServer = restify.createServer()
        this.router = new Router(this.httpServer)
    }

    async start(port: number = 80, host: string = '127.0.0.1') {
        this.httpServer.listen(port, host, function () {
            console.log(`server start @ ${host}:${port}`)
        })
    }

    public get(path: string) {
        return (target: any, propertyKey: string) => {
            this.httpServer.get(path, target)
        }
    }
}