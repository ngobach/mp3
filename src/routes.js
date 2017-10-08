import { Router } from 'express';
import api from './api';

const routes = new Router();

routes.use('/api', api);

export default routes;
