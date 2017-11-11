import * as restify from 'restify'
let _SERVER: restify.Server;
export class Router {
    private server: restify.Server
    constructor(server: restify.Server) {
        this.server = server;
    }
}