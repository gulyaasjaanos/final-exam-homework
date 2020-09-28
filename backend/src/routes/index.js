import express from 'express';
import bodyParser from 'body-parser';
import { sessionController, sessionMiddleware } from '../dependencies';

const cors = require('cors');
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

router.post('/session', sessionController.post );
router.use('/items', sessionMiddleware.post );
router.get('/items', (req, res) => res.status(200).send({userid : req.userid}));

export default router;
