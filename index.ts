import {getTo, RoutingHttpHandler, ResourceRoutingHttpHandler} from "http4js/dist/main/core/RoutingHttpHandler";
import {Body} from "http4js/dist/main/core/Body";
import {Response} from "http4js/dist/main/core/Response";

class App {
    private port;

    constructor(config: object) {
        this.port = config["port"];
    }

    run(resourceRoutingHttpHandler: ResourceRoutingHttpHandler) {
        resourceRoutingHttpHandler.asServer(this.port).start()
    }
}

let routes = getTo("/", (req) => {
    return new Response(200, new Body("Hello, world!"))
}).withRoutes(getTo("/tosh", (req) => {
    return new Response(400, new Body("Hello, tosh!"))
}));

function main(){
    let config = {port: 3000};
    console.log("Running with config:");
    console.log(config);
    new App(config).run(routes);
}

main();
