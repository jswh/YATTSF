import * as http from '../helper/http';
import * as mvc from '../helper/mvc';
import { HttpResponse } from './Response';

interface UrlMapping { url: string, handler(req:any): PromiseLike<any> };
interface UrlMappingPool {GET: UrlMapping[], POST:UrlMapping[], PUT:UrlMapping[], DELETE: UrlMapping[], [key:string]:UrlMapping[]}

export interface UrlMatch {matches: RegExpMatchArray, handler(req:any): PromiseLike<any>};
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

function route(method: http.Method, url: string, optionsAcceptions: false | http.Method[] = false) {
    return  function(target:any, propertyKey: string, descriptor: PropertyDescriptor) {
        let name = target.constructor.name;
        if (typeof registeredUrl[name] == 'undefined') {
            registeredUrl[name] = getEmptyPool();
        }
        registeredUrl[target.constructor.name][method].push({
            url: url,
            handler: (req:any) => {return pack(target[propertyKey], req)}
        })
        if (optionsAcceptions) {
            registeredUrl[target.constructor.name][method].push({
                url: url,
                handler: (req:any) => {return pack(() => {
                    return (new HttpResponse).addHeader('Allow', optionsAcceptions.join(', '));
                }, req)}
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

function pack(handler:mvc.Handler, req:any) {
    return new Promise((resolve, reject)=> {
        resolve(handler(req));
    })
}

export class RouterWraper {
    mapping(method:string, url: string): UrlMatch | false {
        if (typeof(method) !== 'string') {
            return false;
        }
        for (let prefixOfCtr in controllerRoutes) {
            console.log(prefixOfCtr);
            let ctrMatches = url.match('^' + prefixOfCtr);
            console.log(ctrMatches);
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


    get(url: string, ajax:boolean = false) {
        return ajax ? route('GET', url, ['GET']) : route('GET', url);
    }

    post(url: string, ajax:boolean = false) {
        return ajax ? route('POST', url, ['POST']) : route('POST', url);
    }

    put(url: string, ajax:boolean = false) {
        return ajax ? route('PUT', url, ['PUT']) : route('PUT', url);
    }

    delete(url: string, ajax:boolean = false) {
        return ajax ? route('DELETE', url, ['DELETE']) : route('DELETE', url);
    }
}
export const Router = new RouterWraper();