import * as fs from 'fs';
export class View {
    basePath: string;

    constructor(basePath: string) {
        this.basePath = basePath;
    }

    public render(templateName: string, callback: any) {
        let path = this.basePath + '/' + templateName + '.html';
        let temp = fs.readFileSync(path, "utf8");
        callback(temp);
    }
}