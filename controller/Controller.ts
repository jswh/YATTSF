import {Router, HttpRequest, HttpResponse} from "../core"

export class Controller {
    constructor() {

    }

    @Router.get('/')
    hello(req:HttpRequest, res:HttpResponse, next) {
        res.setContent('hello');
        next();
    }
}