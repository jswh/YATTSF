import {App, View} from "./core";
import * as ctr from "./controller";

const app = new App();
new ctr.HelloController();
app.start();