export class SessionMiddleware {

    constructor( sessionService ) {
        this.session = sessionService;
        this.post = this.post.bind(this);
    };

    async post(req, res, next) {

        try {
            req.userid = this.session.verifyToken({token: req.header('TOKEN')}).userid;
            next();
        } catch(error) {
            res.status(403).send({error: error.message});
        }     

    };

};
