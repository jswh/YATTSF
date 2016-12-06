import * as http from '../helper/http';
import * as mvc from '../helper/mvc';
interface UrlMapping { url: string, handler(): any };
interface UrlMappingPool {GET: UrlMapping[], POST:UrlMapping[], PUT:UrlMapping[], DELETE: UrlMapping[]}
var resitered:UrlMappingPool = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: []
};

export function mapping(method:string, url: string): mvc.Handler | false {
    let nm:UrlMapping;
    for (nm of resitered[method.toUpperCase()]) {
        if (nm.url == url) {
            return nm.handler;
        }
    }
    return false;
} 

export function route(method: http.Method, url: string) {
    return  function(target, propertyKey: string, descriptor: PropertyDescriptor) {
        resitered[method].push({
            url: url,
            handler: target[propertyKey]
        })
    };
}

export function get(url: string) {
    return route('GET', url);
}

export function post(url: string) {
    return route('POST', url);
}

export function put(url: string) {
    return route('PUT', url);
}

export function DELETE(url: string) {
    return route('DELETE', url);
}