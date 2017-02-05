import * as pug from 'pug';

var renderers = {}
export class View {
    private template:string;
    private data:Object;
    private opts:pug.Options;

    constructor(template:string, data:Object = {}, opts:pug.Options = {cache:true}) {
        this.template = template;
        this.data = data;
        this.opts = opts;
    }

    render():PromiseLike<string> {
        let template = this.template;
        let opts = Object.assign(this.opts, this.data);

        return new Promise((resolve, reject) => {
            pug.renderFile(template, opts, (error, res:string) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(res)
                }
            })
        })
    }
}