import {Server, HelloController} from "./core";

const app = new Server();
app.start(3000, '127.0.0.1');