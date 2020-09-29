export class ItemController {

    constructor(  ) {
        //this.session = sessionService;
        this.post = this.post.bind(this);
    };

    async post(req, res) {

        const userid = req.userid;
        const { itemid } = req.params;
        try {
            const result = (!itemid)? {userid, add : true} : {userid, itemid, sell : true}
            res.status(200).send(result);
        } catch(error) {
            res.status(403).send({error: error.message});
        }     

    };

    async get(req, res) {

        const userid = req.userid;
        const { itemid } = req.params;
        try {
            const result = (!itemid)? {userid} : {userid, itemid}
            res.status(200).send(result);
        } catch(error) {
            res.status(403).send({error: error.message});
        }     

    };

};
