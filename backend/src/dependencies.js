import { SessionController } from './controllers/SessionController';
import { ItemController } from './controllers/ItemController';
import { SessionMiddleware } from './middlewares/SessionMiddleware';
import { SessionService } from './services/SessionService';
import { UserRepo } from './repos/UserRepo';
import { db } from './db/connection';

export const userRepo = new UserRepo(db);
export const sessionService = new SessionService(userRepo);
export const sessionController = new SessionController(sessionService);
export const sessionMiddleware = new SessionMiddleware(sessionService);

export const itemController = new ItemController();
