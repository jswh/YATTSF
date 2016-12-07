import {Router, HttpRequest, HttpResponse} from "../core"

export class Controller {
    constructor() {

    }

    @Router.get('/')
    hello(req:HttpRequest) {
        return 'hello';
    }
}