import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import EstablishmentController from './app/controllers/EstablishmentController';
import CommentController from './app/controllers/CommentController';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';


const upload = multer(multerConfig);
const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/users/:userID', UserController.show);
routes.post('/users', UserController.store);
routes.put(
  '/users/:userID',
  upload.single('thumbnail'),
  UserController.update,
);

routes.get('/establishments', EstablishmentController.index);
routes.post('/establishments', EstablishmentController.store);
routes.get('/establishments/:establishmentID', EstablishmentController.show);
routes.put('/establishments/:establishmentID', upload.single('thumbnail'), EstablishmentController.update);

routes.post('/comments/:establishmentID',  CommentController.store);


routes.post('/products', upload.single('thumbnail'), ProductController.store);
routes.get('/products', ProductController.index);


routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);


routes.get('/', (req, res) => res.json({ msg: 'ok' }));

export default routes;
