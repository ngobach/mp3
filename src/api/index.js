import { Router } from 'express';
import songsRouter from './songs';

const router = new Router();
router.use('/songs', songsRouter);

export default router;