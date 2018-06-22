import express from 'express';
import coinPrivete from './private';
import coinPublic from './public';

const router = express.Router();

router.use('/private', coinPrivete);
router.use('/public', coinPublic);

export default router;