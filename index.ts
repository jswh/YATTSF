import {App} from './core/app';
import {HttpRequest} from './core/Request';
import {HttpResponse} from './core/Response';

const app = new App();

app.route('get', '/', (req:HttpRequest, res:HttpResponse) => {
    res.setContent({code:0, msg:'hello world'});
});

app.route('get', '/login', (req:HttpRequest, res:HttpResponse) => {
    
});
app.start();