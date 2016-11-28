/// <reference path="./typings/globals/node/index.d.ts" />
import * as http from 'http';
http.createServer((request, response) => {
    console.log(request.httpVersion);
    response.write("ok");
    response.end();
}).listen(3000, '127.0.0.1');
