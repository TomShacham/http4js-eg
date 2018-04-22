import * as Handlebars from "handlebars";
import * as fs from "fs";
import {FriendsService} from "./FriendsService";
import {Friend} from "./Friend";
import {RoutingHttpHandler, getTo} from "http4js/dist/core/Routing";
import {Response} from "http4js/dist/core/Response";

const render = (templateName, data) => {
    const source = fs.readFileSync(`./src/templates/${templateName}.hbs`).toString("utf8");
    const template = Handlebars.compile(source);
    return template(data);
};

export class App {

    friends: FriendsService;

    constructor(friends: FriendsService) {
        this.friends = friends;
        return this;
    }

    routes(): RoutingHttpHandler {
        return getTo("/", () => {
            return Promise.resolve(new Response(200, "Hello, world!"));
        })
            .withHandler("/friends", "GET", async(req) => {
                const queries = req.queries;
                const searchTerm = queries["name"];
                const friends = await this.friends.all();
                const filteredFriends = searchTerm
                    ? friends.filter(friend => friend.name.indexOf(searchTerm) > -1)
                    : friends;

                const html = render("friends", {friends: filteredFriends.map(f => f.name)});

                return Promise.resolve(new Response(200, html));
            })

            .withHandler("/friends/{name}", "GET", async(req) => {
                const name = req.pathParams["name"];
                const friends = await this.friends.all();
                const filteredFriends = name
                    ? friends.filter(friend => friend.name.indexOf(name) > -1)
                    : friends;
                let html = (filteredFriends.map(friend => friend.name)).join(",");
                return Promise.resolve(new Response(200, html));
            })

            .withHandler("/friends", "POST", async(req) => {
                const newFriend = new Friend(req.bodyString().split("=")[1]);
                const saved = await this.friends.add(newFriend);
                return new Response(302).setHeader("Location", "/friends")
            })

            .withFilter((handler) => (req) => {
                return handler(req).then(response => {
                    if (response.status == 404) {
                        return Promise.resolve(new Response(404, "Page not found"));
                    } else {
                        return response;
                    }
                })
            })
            //this is for google chrome
            .withHandler("/favicon.ico", "GET", () => {
                return Promise.resolve(new Response(200));
            })

    }
}

