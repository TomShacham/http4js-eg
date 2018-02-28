import {Stack} from "./src/main/Stack";
import {App} from "./src/main/App";

main();

function main() {
    let config = {port: 3000};
    let app = new App();
    new Stack(config).run(app.routes());
};
