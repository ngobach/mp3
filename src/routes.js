import { Router } from 'express';
import Song from './models/Song';

const routes = Router();

routes.get('/songs', async (req, res) => {
  const songs = await Song.find().exec();
  res.send(songs);
});

routes.post('/')

export default routes;
