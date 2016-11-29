/// <reference path="./typings/globals/node/index.d.ts" />
import * as http from 'http';
const routers = {
    'post': {
        '/': (req: http.IncomingMessage, res: http.ServerResponse) => {res.write('Hello World !')}
    },
    'get': {

    },
    'default': (req: http.IncomingMessage, res: http.ServerResponse) => {res.writeHead(404);}
}; 
http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let found = false;
    for (let path in routers[req.method.toLowerCase()]) {
        
    }
    if (!found && typeof(routers['default']) == 'function') {
        routers.default(req, res);
    }
    res.end();
}).listen(3000, '127.0.0.1');
