import {routable, Router, HttpRequest, HttpResponse, before} from "../core"
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