import core from "../core"
import {HttpRequest} from '../core/Request';
import {HttpResponse} from '../core/Response';

export class Controller {
    constructor() {

    }

    @core.Router.route("GET", '/')
    hello(req:HttpRequest, res:HttpResponse, next) {
        res.setContent('hello');
        next();
    }
}