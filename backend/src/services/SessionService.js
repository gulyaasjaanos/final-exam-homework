import jwt from 'jsonwebtoken';

export class SessionService {

    constructor( userRepo ) {
        this.user = userRepo;
        this.login = this.login.bind(this);
    };

    async login({ username, password }) {

        const userid = await this.user.getUserId({ username, password });
        return jwt.sign({ userid}, process.env.JWT_SECRET || 'greenbay');

    };

    async userData({ userid }) {

      const userData =  await this.user.getById({ userid });
      delete userData.id;
      delete userData.password;
      return userData;

    };

    verifyToken({ token }) {

        try {
          const { userid } = jwt.verify(
            token,
            process.env.JWT_SECRET || 'greenbay'
          );
          return userid;
        } catch (error) {
          throw new Error('notAuthenticated');
        }
        
    };

};
