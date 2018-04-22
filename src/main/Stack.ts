import {NativeServer} from "http4js/dist/main/servers/NativeServer";
import {App} from "./App";

export class Stack {
    config;

    constructor(config = {port: 3000}) {
        this.config = config;
    }

    run(app: App) {
        let port = this.config["port"];
        console.log("Running on port " + port);
        app
            .routes()
            .asServer(new NativeServer(port))
            .start()
    }
}


