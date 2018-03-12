import {Request} from "http4js/dist/main/core/Request";
import {equal} from "assert";
import {TestApp} from "../TestApp";

describe("unknown routes", () => {

    it("404 page if no routes match", () => {
        let request = new Request("GET", "/unknown-route");
        let testApp = new TestApp();

        let response = testApp.serve(request);

        equal(response.status, 404);
        equal(response.bodyString(), "Page not found");
    });

});