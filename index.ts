import {App} from './core/app';

const app = new App();

app.route('get', '/', (req, res) => {
    res.setContent('Hello World !');
})
app.start();