#YATTSF

## features
1. MVC
2. use decorator router like flask()

        class HelloController extends BaseController {
            @Router.get('/')
            hello(req:HttpRequest) {
                return 'hello';
            }
        }
