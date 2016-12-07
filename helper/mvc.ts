import {HttpRequest} from "../core/Request"
import {HttpResponse} from "../core/Response"
export interface Handler {
    (req:HttpRequest)
}