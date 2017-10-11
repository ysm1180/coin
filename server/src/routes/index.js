import express from 'express';
import coinPrivate from './coinone/private';
import coinPublic from './coinone/public';

const router = express.Router();

router.use('/private', coinPrivate);
router.use('/public', coinPublic);

export default router;
