#YATTSF
## install
    npm install yattsf

## example

    //controller.ts
    import {Router, HttpRequest, HttpResponse, BaseController} from "../core"

    export class HelloController extends BaseController {
        @Router.get('/')
        hello(req:HttpRequest) {
            return 'hello';
        }
    }


    //app.ts
    import {Server, HelloController} from 'yattsf';

    const app = new Server();
    new HelloController();
    app.start(3000, '127.0.0.1')