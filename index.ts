import {Stack} from "./src/main/Stack";
import {App} from "./src/main/App";
import {RealFriendsDB} from "./src/main/RealFriendsDB";
import {FriendsService} from "./src/main/FriendsService";

main();

function main() {
    let config = {port: 3000};
    let realFriendsDb = new RealFriendsDB();
    let friendsService = new FriendsService(realFriendsDb);
    let app = new App(friendsService);

    new Stack(config).run(app);
}
