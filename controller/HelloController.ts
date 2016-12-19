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