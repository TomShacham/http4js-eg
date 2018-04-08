import {FriendsDB} from "./FriendDb";
import {Friend} from "./Friend";

export class FakeFriendsDB implements FriendsDB {

    constructor() {
        return this;
    }

    friends() {
        return Promise.resolve([new Friend("Tosh"), new Friend("Bosh"), new Friend("Losh")]);
    }
}
