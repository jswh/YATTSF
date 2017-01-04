import { HttpRequest } from './Request';
function route(processor : Function) {
    return function(target:any, propertyKey: string, descriptor: PropertyDescripto) {
        let origin_handler = target[propertyKey];
        target[propertyKey] = (req:HttpRequest) => {
            processor(req);

        };
    }
}