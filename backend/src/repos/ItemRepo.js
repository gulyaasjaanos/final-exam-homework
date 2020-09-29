export class ItemRepo {

    constructor( db ) {
        this.db = db;
    };

    async add({ id, name, description, url, price, ownerid, buyerid, status }) {

        const inserted = (await this.db.query('INSERT INTO items (name, description, url, price, ownerid, status) VALUES(?,?,?,?,?,?)',
        [name, description, url, price, ownerid, status]
        )).results.insertId;
        return inserted;

    };

    async getSellable() {

        const sellable = (await this.db.query('SELECT name, description, url, price FROM items WHERE status="sellable"')).results;
        return sellable;

    };

    async getById(id) {

        const item = (await this.db.query(
            `SELECT
                name, 
                description,
                url,
                price,
                ownerid,
                owner.username ownername,
                buyerid,
                buyer.username buyername,
                status
            FROM items
            LEFT JOIN users AS owner ON owner.id = items.ownerid
            LEFT JOIN users AS buyer ON buyer.id = items.buyerid
            WHERE items.id=?`, 
            [id])).results[0];
        return item;

    };

    async update({itemid, userid}) {

        if (!userid) throw new Error('missingUserId');
        const updated = (await this.db.query('UPDATE items SET status="sold",buyerid=? WHERE id=?', [userid, itemid])).results.changedRows;
        if (!updated) throw new Error('invalidItemId');
        return updated;

    };

};
