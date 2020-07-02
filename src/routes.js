import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

const upload = multer(multerConfig);
const routes = new Router();

routes.get('/', (req, res) => res.json({ msg: 'ok' }));

export default routes;
