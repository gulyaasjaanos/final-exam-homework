import { db } from "../db/connection";

export class UserRepo {

    constructor( db ) {

    };

    async getUserId({ username, password }) {

        const userid = (await db.query('SELECT id AS userid FROM users WHERE username=?', [username])).results[0];
        if (!userid) throw new Error('invalidUsername');
        const pass = (await db.query('SELECT id AS userid FROM users WHERE username=? and password=?', [username, password])).results[0];
        if (!pass) throw new Error('invalidPassword');
        return userid;

    };

};
