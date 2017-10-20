import express from 'express';
import coinPrivate from './coinone/private';
import coinPublic from './coinone/public';
import coinAlarm from './coinone/alarm';

const router = express.Router();

router.use('/coinone/private', coinPrivate);
router.use('/coinone/public', coinPublic);
router.use('/coinone/alarm', coinAlarm);

export default router;
