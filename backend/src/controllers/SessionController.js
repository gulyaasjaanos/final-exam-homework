export class SessionController {

    constructor( sessionService ) {
        this.session = sessionService;
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
    };

    async post(req, res, next) {

        const tokenParam = req.header('TOKEN');
        const { username, password } = req.body;
        try {
            const token = (!tokenParam)? await this.session.login({ username, password }) : await this.session.verifyToken({ token : tokenParam });
            res.status(200).send({token});
        } catch(error) {
            next(error);
        }     

    };

    async get(req, res, next) {

        const userid = req.userid;
        try {
            const userData = await this.session.userData({ userid });
            res.status(200).send({userData});
        } catch(error) {
            next(error);
        }     

    };  

};
