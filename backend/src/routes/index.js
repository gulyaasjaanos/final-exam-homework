import express from 'express';
const cors = require('cors');

const router = express.Router();
router.use(cors());

router.get('/:id', (req,res) => res.status(200).send(req.params.id) );


export default router;
