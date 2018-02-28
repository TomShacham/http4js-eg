import {Body} from "http4js/dist/main/core/Body";
import {Response} from "http4js/dist/main/core/Response";
import {getTo, ResourceRoutingHttpHandler} from "http4js/dist/main/core/RoutingHttpHandler";

export class App {

    constructor(/*fake db*/) {
        return this;
    }

    routes(): ResourceRoutingHttpHandler {
        return getTo("/", (req) => {
            return new Response(200, new Body("Hello, world!"))
        })
            .withHandler("/friends", "GET", (req) => {
                return new Response(200, new Body("<p>" + friends.join("</p><p>") + "</p>"))
            })
            .withHandler("/friends/{name}", "GET", (req) => {
                let name = req.pathParams["name"];
                return new Response(200, new Body(friends.filter(it => it == name)[0]));
            })
            .withFilter((handler) => (req) => {
                if (handler(req).status == 404) {
                    return new Response(404, new Body("Page not found"));
                } else {
                    return handler(req);
                }
            });
    }
}

let friends = ["tosh", "bosh", "losh"];
