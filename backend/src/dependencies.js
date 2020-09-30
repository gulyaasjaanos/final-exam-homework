import { SessionController } from './controllers/SessionController';
import { ItemController } from './controllers/ItemController';
import { SessionMiddleware } from './middlewares/SessionMiddleware';
import { ErrorHandler } from './middlewares/ErrorHandler';
import { SessionService } from './services/SessionService';
import { ItemService } from './services/ItemService';
import { UserRepo } from './repos/UserRepo';
import { ItemRepo } from './repos/ItemRepo';
import { db } from './db/connection';

export const userRepo = new UserRepo(db);
export const sessionService = new SessionService(userRepo);
export const sessionController = new SessionController(sessionService);
export const sessionMiddleware = new SessionMiddleware(sessionService);

export const itemRepo = new ItemRepo(db);
export const itemService = new ItemService(userRepo, itemRepo);
export const itemController = new ItemController(itemService);

export const errorHandler = new ErrorHandler();
