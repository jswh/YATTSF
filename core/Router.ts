import * as http from '../helper/http';
import * as mvc from '../helper/mvc';
import { HttpResponse } from './Response';
import { HttpRequest } from './Request';

interface UrlMapping { url: string, handler: mvc.Handler };
interface UrlMappingPool {GET: UrlMapping[], POST:UrlMapping[], PUT:UrlMapping[], DELETE: UrlMapping[], [key:string]:UrlMapping[]}
interface AjaxOption { 'allowMethods': http.Method[], 'allowOrigin': string }
export interface UrlMatch {matches: RegExpMatchArray, handler: mvc.Handler};
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
        let handler = target[propertyKey]
        let name = target.constructor.name;
        if (typeof registeredUrl[name] == 'undefined') {
            registeredUrl[name] = getEmptyPool();
        }

        if (ajaxOption) {
            registeredUrl[target.constructor.name]['OPTIONS'].push({
                url: url,
                handler: async (req:HttpRequest, res: HttpResponse) => {
                    let allowMethods = ajaxOption.allowMethods.join(', ');
                    return [
                        req,
                        (new HttpResponse)
                            .addHeader('Allow', allowMethods)
                            .addHeader('Access-Control-Allow-Origin', ajaxOption.allowOrigin)
                            .addHeader('Access-Control-Allow-Methods', allowMethods)
                    ];
                }
            })
            handler = async (req:HttpRequest, res:HttpResponse) => {
                [req, res] = await target[propertyKey](req, res);
                res.addHeader('Access-Control-Allow-Origin', ajaxOption.allowOrigin);

                return [req, res];
            }
        }

        registeredUrl[target.constructor.name][method].push({
            url: url,
            handler: async (req:HttpRequest, res:HttpResponse) => {return await handler(req, res)}
        })
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

export function before(processor: mvc.Handler) {
    return (controller:any, handler:string, handlerDescriptor: PropertyDescriptor) => {
        let originHandler:mvc.Handler = controller[handler]
        return {
            value: async (req:HttpRequest, res:HttpResponse) => {
                console.log('middle')
                let result = await processor(req, res);
                return await originHandler(result[0], result[1]);
            }
        }
    }
}

export const Router = new RouterWraper();