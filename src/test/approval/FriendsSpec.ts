import {Request} from "http4js/dist/main/core/Request";
import {TestApp} from "../TestApp";
import {Method} from "http4js/dist/main/core/Methods";

describe("listing friends", () => {

    it("shows them all unfiltered", async () => {
        let testApp = new TestApp();
        await testApp.serve(new Request("POST", "/friends").setForm({name: "Tosh"}));
        await testApp.serve(new Request("POST", "/friends").setForm({name: "Bosh"}));
        await testApp.serve(new Request("POST", "/friends").setForm({name: "Losh"}));
        await testApp.approve("unfiltered friends",
            new Request("GET", "/friends"))
    });

    it("shows one friend at a time", async () => {
        let testApp = new TestApp();
        await testApp.serve(new Request("POST", "/friends").setForm({name: "Tosh"}));
        await testApp.approve("one friend",
            new Request("GET", "/friends/Tosh"))
    });

});