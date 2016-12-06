import * as fs from "fs";
import core from "./core";
import {App} from './core/App';
import {HttpRequest} from './core/Request';
import {HttpResponse} from './core/Response';
import {View} from './core/View';

const app = new core.App();
const view = new core.View(fs.realpathSync('./views'));

class Controller {
    constructor() {

    }

    @core.Router.route("GET", '/')
    hello(req:HttpRequest, res:HttpResponse, next) {
        res.setContent('hello');
        next();
    }
}
var c = new Controller();
app.start();