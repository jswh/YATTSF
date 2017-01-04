import * as http from '../helper/http';
import * as mvc from '../helper/mvc';
import { HttpResponse } from './Response';
import { HttpRequest } from './Request';

interface UrlMapping { url: string, handler(req:HttpRequest, res:HttpResponse): PromiseLike<[HttpRequest, HttpResponse]> };
interface UrlMappingPool {GET: UrlMapping[], POST:UrlMapping[], PUT:UrlMapping[], DELETE: UrlMapping[], [key:string]:UrlMapping[]}
interface AjaxOption { 'allowMethods': http.Method[], 'allowOrigin': string }
export interface UrlMatch {matches: RegExpMatchArray, handler(req:HttpRequest, res:HttpResponse): PromiseLike<[HttpRequest, HttpResponse]>};
function getEmptyPool(): UrlMappingPool {
    return {
        GET: [],
        POST: [],
        PUT: [],
        DELETE: [],
        OPTIONS: []
    };
}
var controllerRoutes:{[key:string]:any[]} = {};
var registeredUrl:{[key:string]: UrlMappingPool} = {};

function route(method: http.Method, url: string, ajaxOption: false | AjaxOption = false) {
    return  function(target:any, propertyKey: string, descriptor: PropertyDescriptor) {
        let name = target.constructor.name;
        if (typeof registeredUrl[name] == 'undefined') {
            registeredUrl[name] = getEmptyPool();
        }
        registeredUrl[target.constructor.name][method].push({
            url: url,
            handler: (req:HttpRequest, res:HttpResponse) => {return pack(target[propertyKey], req, res)}
        })
        if (ajaxOption) {
            registeredUrl[target.constructor.name]['OPTIONS'].push({
                url: url,
                handler: (req:HttpRequest, res: HttpResponse) => {return pack((req:HttpRequest, res:HttpResponse) => {
                    let allowMethods = ajaxOption.allowMethods.join(', ');
                    return [
                        req,
                        (new HttpResponse)
                            .addHeader('Allow', allowMethods)
                            .addHeader('Access-Control-Allow-Origin', ajaxOption.allowOrigin)
                            .addHeader('Access-Control-Allow-Methods', allowMethods)
                    ];
                }, req, res)}
            })
        }
    };
}

export function routable(prefix: string = '/'): Function {
    return function (constructor: Function): void {
        let name = constructor.name;
        if (typeof controllerRoutes[prefix] == 'undefined') {
            controllerRoutes[prefix] = [];
        }
        if (typeof registeredUrl[name] == 'undefined') {
            registeredUrl[name] = getEmptyPool();
        }

        controllerRoutes[prefix].unshift(name);
    }
}

function pack(handler:mvc.Handler, req:HttpRequest, res:HttpResponse) {
    return new Promise((resolve, reject)=> {
        resolve(handler(req, res));
    })
}

export class RouterWraper {
    mapping(method:string, url: string): UrlMatch | false {
        if (typeof(method) !== 'string') {
            return false;
        }
        for (let prefixOfCtr in controllerRoutes) {
            let ctrMatches = url.match('^' + prefixOfCtr);
            if (ctrMatches) {
                let ctrName;
                for (ctrName of controllerRoutes[prefixOfCtr]) {
                    let nm:UrlMapping;
                    for (nm of registeredUrl[ctrName][method.toUpperCase()]) {
                        let matches = url.match(nm.url)
                        if (matches && matches.length > 0) {
                            return {
                                matches: matches,
                                handler: nm.handler
                            }
                        }
                    }
                }
            }
        }

        return false;
    }


    get(url: string, ajaxAllowOrigin:false | string = false) {
        return ajaxAllowOrigin ? route('GET', url, {allowMethods: ['GET'], allowOrigin: ajaxAllowOrigin}) : route('GET', url);
    }

    post(url: string, ajaxAllowOrigin:false | string = false) {
        return ajaxAllowOrigin ? route('POST', url, {allowMethods: ['POST'], allowOrigin: ajaxAllowOrigin}) : route('POST', url);
    }

    put(url: string, ajaxAllowOrigin:false | string = false) {
        return ajaxAllowOrigin ? route('PUT', url, {allowMethods: ['PUT'], allowOrigin: ajaxAllowOrigin}) : route('PUT', url);
    }

    delete(url: string, ajaxAllowOrigin:false | string = false) {
        return ajaxAllowOrigin ? route('DELETE', url, {allowMethods: ['DELETE'], allowOrigin: ajaxAllowOrigin}) : route('DELETE', url);
    }
}

export const Router = new RouterWraper();