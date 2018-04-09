import {RoutingHttpHandler} from "http4js/dist/main/core/Routing";

export class Stack {
    config;

    constructor(config = {port: 3000}) {
        this.config = config;
    }

    run(routing: RoutingHttpHandler) {
        let port = this.config["port"];
        console.log("Running on port " + port);
        routing
            .asServer(port)
            .start()
    }
}


