export class SessionController {

    constructor( sessionService ) {
        this.session = sessionService;
        this.post = this.post.bind(this);
    };

    async post(req, res) {

        const { username, password } = req.body;
        try {
            const token = await this.session.login({ username, password });
            res.status(201).send({token});
        } catch(error) {
            res.status(403).send({error: error.message});
        }     

    };

};
