import express from 'express';
import coinone from './coinone';
import upbit from './upbit';

const router = express.Router();

router.use('/coinone', coinone);
router.use('/upbit', upbit);

export default router;
