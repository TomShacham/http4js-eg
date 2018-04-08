import {Friend} from "./Friend";
import {FriendsDB} from "./FriendDb";

const {Pool} = require('pg');

export class RealFriendsDB implements FriendsDB {
    private pool = new Pool({
        user: 'postgres', //env var: PGUSER
        database: 'postgres', //env var: PGDATABASE
        password: 'postgres', //env var: PGPASSWORD
        host: 'localhost', // Server hosting the postgres database
        port: 5432, //env var: PGPORT
        max: 1000, // max number of clients in the pool
        idleTimeoutMillis: 15000 // how long a client is allowed to remain idle before being closed
    });

    constructor() {
        this.runMigrations()
    }

    async friends(): Promise<Friend[]> {
        const friends = await this.pool.query("select * from friends");
        return friends.rows;
    }

    private toFriends(rows) {
        return rows.map(it => {
            return new Friend(it.name)
        })
    }

    private runMigrations() {

    }
}
