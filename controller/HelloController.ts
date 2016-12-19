import {Router, HttpRequest, HttpResponse, BaseController} from "../core"

export class HelloController extends BaseController {
    @Router.get('/')
    hello(req:HttpRequest) {
        const res = new HttpResponse();
        res.setContent('Hello!').addCookie('hello-name', 'jswh');

        return res;
    }
}