import express from 'express';
import bodyParser from 'body-parser';
import { 
    sessionController,
    itemController,
    sessionMiddleware,
    errorHandler
} from '../dependencies';

const cors = require('cors');
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.post('/session', sessionController.post );
router.use('/', sessionMiddleware.post );
router.get('/session', sessionController.get );
router.get('/items', itemController.get );
router.get('/items/:itemid', itemController.get );
router.post('/items', itemController.post );
router.post('/items/:itemid', itemController.post );

router.use('/', errorHandler.post );

export default router;
