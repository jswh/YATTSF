import {Server, HelloController} from "./core";

const app = new Server();
new HelloController();
app.start(3000, '127.0.0.1');