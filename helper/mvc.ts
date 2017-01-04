import {HttpRequest} from "../core/Request"
import {HttpResponse} from "../core/Response"
export interface Handler {
    (req:HttpRequest, res: HttpResponse):[HttpRequest, HttpResponse]
}
export interface HandleResult {
    req: HttpRequest,
    res: HttpResponse
}