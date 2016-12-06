import * as fs from "fs";
import {App} from './core/App';
import {HttpRequest} from './core/Request';
import {HttpResponse} from './core/Response';
import {View} from './core/View';

const app = new App();
const view = new View(fs.realpathSync('./views'));

app.route('get', '/', (req:HttpRequest, res:HttpResponse) => {
    res.setContent({code:0, msg:'hello world'});
});

app.route('post', '/login', (req:HttpRequest, res:HttpResponse, next) => {
    let username = req.query['username'];
    let password = req.query['password'];
    //authcheck
    view.render('index', (data) => {
        res.setContent(data);
        next();
    });
});

app.route('post', 'register', (req:HttpRequest, res:HttpResponse, next) => {
    
});
app.start();