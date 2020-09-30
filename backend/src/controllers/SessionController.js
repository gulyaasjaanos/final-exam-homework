export class SessionController {

    constructor( sessionService ) {
        this.session = sessionService;
        this.post = this.post.bind(this);
    };

    async post(req, res, next) {

        const { username, password } = req.body;
        try {
            const token = await this.session.login({ username, password });
            res.status(200).send({token});
        } catch(error) {
            next(error);
        }     

    };

};
