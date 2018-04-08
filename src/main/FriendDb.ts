import {Friend} from "./Friend";

export interface FriendsDB {
    friends(): Promise<Array<Friend>>
}
