import {FriendsDB} from "./FriendDb";

export class FriendsService {
    private db;

    constructor(friendsDb: FriendsDB) {
        this.db = friendsDb;
    }

    friends() {
        return this.db.friends();
    }
}