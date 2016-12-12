#YATTSF

## features
1. MVC
2. use decorator router like flask, [example](https://github.com/jswh/YATTSF/blob/master/controller/HelloController.ts)


        class HelloController extends BaseController {
            @Router.get('/')
            hello(req:HttpRequest) {
                return 'hello';
            }
        }

## setup
1. clone this repo
2. `npm install` to install dependences
3. `npm run build` to build the project
4. `npm run start` to start the webserver
5. visit http://127.0.0.1:3000/

## usage
1. add controller
2. create a instance of the controller in index.ts