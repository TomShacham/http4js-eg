import {Body} from "../../../http4js/dist/main/core/Body";
import {getTo, ResourceRoutingHttpHandler} from "http4js/dist/main/core/RoutingHttpHandler";
import {FriendsDB} from "./FriendDb";
import * as Handlebars from "handlebars";
import * as fs from "fs";
import {Response} from "http4js/dist/main/core/Response";

let render = (templateName, data) => {
    let source = fs.readFileSync(`./src/templates/${templateName}.hbs`).toString("utf8");
    let template = Handlebars.compile(source);
    return template(data);
};

export class App {

    constructor(friendsDb: FriendsDB) {
        return this;
    }

    routes(): ResourceRoutingHttpHandler {
        return getTo("/", (req) => {
            return new Response(200, new Body("Hello, world!"))
        })
            .withHandler("/friends", "GET", (req) => {
                let queries = req.queries;
                let searchTerm = queries["name"];
                let filteredFriends = searchTerm
                    ? friends.filter(f => f.indexOf(searchTerm) > -1)
                    : friends;

                let html = render("friends", {friends: filteredFriends});

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
            })
            //this is for google chrome
            .withHandler("/favicon.ico", "GET", (req) => {
                return new Response(200);
            })

    }
}

let friends = ["tosh", "bosh", "losh"];
