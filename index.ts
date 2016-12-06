import * as fs from "fs";
import core from "./core";


const app = new core.App();
const view = new core.View(fs.realpathSync('./views'));
app.register([require('./controller/Controller')]);
app.start();