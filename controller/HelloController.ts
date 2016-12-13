import {Router, HttpRequest, HttpResponse, BaseController} from "../core"

export class HelloController extends BaseController {
    @Router.get('/')
    hello(req:HttpRequest) {
        return 'hello';
    }
}