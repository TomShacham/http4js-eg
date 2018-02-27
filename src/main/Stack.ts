import {ResourceRoutingHttpHandler} from "http4js/dist/main/core/RoutingHttpHandler";

export class Stack {
    config: object;

    constructor(config: object = {port: 3000}) {
        this.config = config;
    }

    run(resourceRoutingHttpHandler: ResourceRoutingHttpHandler) {
        resourceRoutingHttpHandler.asServer(this.config["port"]).start()
    }
}


