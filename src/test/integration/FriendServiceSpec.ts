import {FriendsService} from "../../main/FriendsService";
import {RealFriendsDB} from "../../main/RealFriendsDB";
import {equal} from "assert";
import {deepEqual} from "assert";

describe("friends service", () => {

    it("fetches all friends", async () => {
       let friendsService = new FriendsService(new RealFriendsDB());
       return friendsService.friends().then(
           friends => deepEqual(friends, []))
    });

});