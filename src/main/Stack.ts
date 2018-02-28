import {ResourceRoutingHttpHandler} from "http4js/dist/main/core/RoutingHttpHandler";

export class Stack {
    config: object;

    constructor(config: object = {port: 3000}) {
        this.config = config;
    }

    run(resourceRoutingHttpHandler: ResourceRoutingHttpHandler) {
        let port = this.config["port"];
        console.log("Running on port " + port)
        resourceRoutingHttpHandler.asServer(port).start()
    }
}


