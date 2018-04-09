import {FriendsDB} from "./FriendDb";
import {Friend} from "./Friend";

export class FriendsService {
    private db;

    constructor(friendsDb: FriendsDB) {
        this.db = friendsDb;
    }

    async all() {
        const results = await this.db.all();
        return this.toFriends(results);
    }

    async add(friend: Friend) {
        return await this.db.add(friend)
    }

    private toFriends(rows) {
        return rows.map(it => new Friend(it.name))
    }

}