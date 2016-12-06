import * as fs from "fs";
import {App, View} from "./core";


const app = new App();
const view = new View(fs.realpathSync('./views'));
app.register([require('./controller/Controller')]);
app.start();