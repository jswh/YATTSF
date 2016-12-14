#YATTSF
## install
    npm install yattsf

## example

    //controller.ts
    import {Router, HttpRequest, BaseController} from "yattsf"

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