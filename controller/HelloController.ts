import {routable, Router, HttpRequest, HttpResponse} from "../core"

@routable()
export class HelloController {
    @Router.get('/hello')
    @Router.get('/hello/(.*)')
    hello(req:HttpRequest, res: HttpResponse) {
        let name = req.pathParams.length > 0 ? req.pathParams[0] : 'World';
        res.setContent(`Hello ${name} !`).addCookie('hello-name', name);

        return res;
    }
}