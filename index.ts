/// <reference path="./typings/globals/node/index.d.ts" />
import * as http from 'http';
import * as core from './libs/core';

const routers = {
    'post': {
    },
    'get': {
        '/': (req: http.IncomingMessage, res: http.ServerResponse) => {res.write('Hello World !')}
    },
    'default': (req: http.IncomingMessage, res: http.ServerResponse) => {res.writeHead(404);}
}; 
http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    let found = false;
    let req = new core.RequestHelper(request);
    let requestPath = req.getPath();
    let func = routers[request.method.toLowerCase()][req.getPath()];
    if(!func) {
        func = routers.default;
    }
    if (typeof(func) == 'function') {
        func(request, response);
    }
    response.end();
}).listen(3000, '127.0.0.1');
