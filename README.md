#YATTSF
## install
    npm install yattsf

## example

    //controller.ts
    import {Router, HttpRequest, BaseController} from "yattsf"

    export class HelloController extends BaseController {
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
    new HelloController();
    app.start(3000, '127.0.0.1')

Build and start your app, then try "http://127.0.0.1:3000/hello" and "http://127.0.0.1:3000/hello/YATTSF" in browser.