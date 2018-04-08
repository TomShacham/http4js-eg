import {Request} from "http4js/dist/main/core/Request";
import {TestApp} from "../TestApp";

describe("listing friends", () => {

    it("shows them all unfiltered", () => {
        new TestApp().approve("unfiltered friends",
            new Request("GET", "/friends"))
    });

});