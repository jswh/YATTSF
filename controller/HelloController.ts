import {Router, HttpRequest, HttpResponse} from "../core"

export class HelloController {
    @Router.get('/')
    hello(req:HttpRequest) {
        return 'hello';
    }
}