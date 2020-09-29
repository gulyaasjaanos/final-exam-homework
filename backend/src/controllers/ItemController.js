export class ItemController {

    constructor( itemService ) {
        this.item = itemService;
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
    };

    async post(req, res) {

        const userid = req.userid;
        const { itemid } = req.params;
        const { itemname, description, url, price } = req.body;
        try {
            const result = (!itemid)? await this.item.add({ userid, itemname, description, url, price }) : await this.item.buy({ userid, itemid })
            res.status(200).send(result);
        } catch(error) {
            res.status(403).send({error: error.message});
        }

    };

    async get(req, res) {

        const userid = req.userid;
        const { itemid } = req.params;
        try {
            const result = (!itemid)? await this.item.list() : await this.item.get({ itemid })
            res.status(200).send(result);
        } catch(error) {
            res.status(403).send({error: error.message});
        }

    };

};
