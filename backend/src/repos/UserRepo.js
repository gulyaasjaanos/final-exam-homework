export class UserRepo {

    constructor( db ) {
        this.db = db;
    };

    async getUserId({ username, password }) {

        const userid = (await this.db.query('SELECT id AS userid FROM users WHERE username=?', [username])).results[0];
        if (!userid) throw new Error('invalidUsername');
        const pass = (await this.db.query('SELECT id AS userid FROM users WHERE username=? and password=?', [username, password])).results[0];
        if (!pass) throw new Error('invalidPassword');
        return userid;

    };

    async getById({ userid }) {

        const userdata = (await this.db.query('SELECT * FROM users WHERE id=?', [userid])).results[0];
        if (!userdata) throw new Error('invalidUserId');
        return userdata;

    };

    async updateDollar({ userid, dollar }) {

        if (!userid) throw new Error('missingUserId');
        if (dollar === undefined) throw  new Error('missingDollar');
        const updated = (await this.db.query('UPDATE users SET dollar=? WHERE id=?', [dollar, userid])).results.changedRows;
        if (!updated) throw new Error('invalidUserId');
        return updated;

    };

};
