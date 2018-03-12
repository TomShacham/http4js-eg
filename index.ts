import {Stack} from "./src/main/Stack";
import {App} from "./src/main/App";
import {RealFriendsDB, FakeFriendsDB} from "./src/main/FriendDb";

main();

function main() {
    let config = {port: 3000};
    let friendsDb = new RealFriendsDB();
    let app = new App(friendsDb);
    new Stack(config).run(app.routes());
}
