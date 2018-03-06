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
            .withHandler("/favicon.ico", "GET", (req) => {
                return new Response(200);
            })
            .withHandler("/friends", "GET", (req) => {
                let queries = req.queries;
                let searchTerm = queries["name"];
                let filteredFriends = searchTerm
                    ? friends.filter(f => f.indexOf(searchTerm) > -1)
                    : friends;

                let html = `<p>${filteredFriends.join("</p><p>")}</p>
                            <form method="post"><input type="text" name="name"/><input type="submit"></form>`;

                return new Response(200, new Body(html))
            })

            .withHandler("/friends/{name}", "GET", (req) => {
                let name = req.pathParams["name"];
                let filter = name
                    ? friends.filter(it => it.indexOf(name) > -1)
                    : friends;
                return new Response(200, new Body(filter.join(",")));
            })

            .withHandler("/friends", "POST", (req) => {
                let newFriend = req.form["name"];
                friends.push(newFriend);
                return new Response(302).setHeader("Location", "/friends")
            })

            .withFilter((handler) => (req) => {
                let response = handler(req);
                if (response.status == 404) {
                    return new Response(404, new Body("Page not found"));
                } else {
                    return response;
                }
            });
    }
}

let friends = ["tosh", "bosh", "losh"];
