import {Server} from "./core";

const app = new Server();
class ctl {
    @app.get('/hello')
    hello() {
        console.log('hellp')
    }
}
app.start(3000, '127.0.0.1');