import {getTo} from "http4js/dist/main/core/RoutingHttpHandler";
import {Body} from "http4js/dist/main/core/Body";
import {Response} from "http4js/dist/main/core/Response";

getTo("/", (req) => {
    return new Response(200, new Body("Hello, world!"))
})
    .asServer(3000)
    .start();