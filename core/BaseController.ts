import {HttpResponse} from "../core"
export class BaseController {
    _abort(code:any){
        let res = new HttpResponse()
        res.setStatusCode(code);
        return res;
    }
}