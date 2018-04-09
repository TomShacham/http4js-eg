import {Request} from "http4js/dist/main/core/Request";
import {TestApp} from "../TestApp";

describe("listing friends", () => {

    it("shows them all unfiltered", async () => {
        let testApp = new TestApp();
        await testApp.approve("unfiltered friends",
            new Request("GET", "/friends"))
    });

});