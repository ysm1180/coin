import express from 'express';
import coinPrivate from './coinone/private';
import coinPublic from './coinone/public';

const router = express.Router();

router.use('/coinone/private', coinPrivate);
router.use('/coinone/public', coinPublic);

export default router;
