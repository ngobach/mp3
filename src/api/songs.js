import { Router } from 'express';
import Song from '../models/Song';

const router = new Router();

router.get('/', async (req, res) => {
    res.send(await Song.find().exec());
});

export default router;
