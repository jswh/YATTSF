import * as http from '../helper/http';
import * as mvc from '../helper/mvc';

interface UrlMapping { url: string, handler(req:any): PromiseLike<any> };
interface UrlMappingPool {GET: UrlMapping[], POST:UrlMapping[], PUT:UrlMapping[], DELETE: UrlMapping[], [key:string]:UrlMapping[]}
var resitered:UrlMappingPool = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: []
};
export function route(method: http.Method, url: string) {
    return  function(target:any, propertyKey: string, descriptor: PropertyDescriptor) {
        resitered[method].push({
            url: url,
            handler: (req) => {return pack(target[propertyKey], req)}
        })
    };
}

function pack(handler:mvc.Handler, req:any) {
    return new Promise((resolve, reject)=> {
        resolve(handler(req));
    })
}

export class RouterWraper {
    mapping(method:string, url: string): mvc.Handler | false {
        if (typeof(method) !== 'string') {
            return false;
        }
        let nm:UrlMapping;
        for (nm of resitered[method.toUpperCase()]) {
            if (nm.url == url) {
                return nm.handler;
            }
        }
        return false;
    } 


    get(url: string) {
        return route('GET', url);
    }

    post(url: string) {
        return route('POST', url);
    }

    put(url: string) {
        return route('PUT', url);
    }

    DELETE(url: string) {
        return route('DELETE', url);
    }
}
export const Router = new RouterWraper();