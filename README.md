#YATTSF
## install
    npm install yattsf

## example

    //HelloController.ts
    import {routable, Router, HttpRequest, HttpResponse} from "../core"

    @routable()
    export class HelloController {
        @Router.get('/hello')
        @Router.get('/hello/(.*)')
        hello(req:HttpRequest) {
            let name = req.pathParams.length > 0 ? req.pathParams[0] : 'World';
            const res = new HttpResponse();
            res.setContent(`Hello ${name} !`).addCookie('hello-name', name);

            return res;
        }
    }


    //app.ts
    import {Server, HelloController} from 'yattsf';

    const app = new Server();
    app.start(3000, '127.0.0.1')

Build and start your app, then try "http://127.0.0.1:3000/hello" and "http://127.0.0.1:3000/hello/YATTSF" in browser.