import {Friend} from "./Friend";

export interface FriendsDB {
    friends(): Array<Friend>
}

export class RealFriendsDB implements FriendsDB {
    friends() {
        return [new Friend("Tosh"), new Friend("Bosh"), new Friend("Losh")]
    }
}

export class FakeFriendsDB implements FriendsDB {
    friends() {
        return [new Friend("Tosh"), new Friend("Bosh"), new Friend("Losh")]
    }
}
