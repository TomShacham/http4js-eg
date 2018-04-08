import {App} from "../main/App";
import {Request} from "http4js/dist/main/core/Request";
import {Response} from "http4js/dist/main/core/Response";
import {ResourceRoutingHttpHandler} from "http4js/dist/main/core/RoutingHttpHandler";
import * as fs from "fs";
import {equal} from "assert";
import {FakeFriendsDB} from "../main/FakeFriendsDB";

export class TestApp {
    routes: ResourceRoutingHttpHandler;

    constructor(){
        let friendsDb = new FakeFriendsDB();
        let app = new App(friendsDb);
        this.routes = app.routes();
    }

    serve(req: Request): Response {
        return this.routes.match(req);
    }

    approve(testFileName: string, req: Request) {
        let actual = this.routes.match(req).bodyString();
        let actualfilePath = `./src/test/resources/${testFileName}.actual`;
        fs.writeFileSync(actualfilePath, actual, "utf8");
        let approvalfilePath = `./src/test/resources/${testFileName}.approved`;
        let expected = fs.readFileSync(approvalfilePath, "utf8");
        try {
            equal(actual, expected);
        } catch (e) {
            console.log(`Approve: \`cp ${actualfilePath} ${approvalfilePath}\``);
            throw e;
        }
    }

}
