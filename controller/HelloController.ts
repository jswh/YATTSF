import {Router, HttpRequest, HttpResponse} from "../core"
import {BaseController} from './BaseController'

export class HelloController extends BaseController {
    @Router.get('/')
    hello(req:HttpRequest) {
        return 'hello';
    }
}