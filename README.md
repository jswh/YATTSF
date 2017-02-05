#YATTSF
## install
    npm install yattsf

## example

    //HelloController.ts
    import {routable, Router, HttpRequest, HttpResponse, before} from "yattsf"
    @routable()
    export class HelloController {
        @Router.get('/hello')
        @Router.get('/hello/(.*)', '*')
        @before(async (req:HttpRequest, res:HttpResponse) => {
            res.addHeader('MIDDLE-WARE', 'test');

            return [req, res]
        })
        async hello(req:HttpRequest, res: HttpResponse) {
            let name = req.pathParams.length > 0 ? req.pathParams[0] : 'World';
            res.setContent(`Hello ${name} !`).addCookie('hello-name', name);

            return [req, res];
        }
    }


    //app.ts
    import {Server, HelloController} from 'yattsf';

    const app = new Server();
    app.start(3000, '127.0.0.1')

Build and start your app, then try "http://127.0.0.1:3000/hello" and "http://127.0.0.1:3000/hello/YATTSF" in browser.