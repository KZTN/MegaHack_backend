import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import EstablishmentController from './app/controllers/EstablishmentController';
import CommentController from './app/controllers/CommentController';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';
import NotificationController from './app/controllers/NotificationController';
import SessionController from './app/controllers/SessionController';
import PostController from './app/controllers/PostController';
import FavoriteController from './app/controllers/FavoriteController';


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
routes.get('/products/:productID', ProductController.show);


routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.get('/orders/:orderID', OrderController.show);
routes.put('/orders/:orderID', OrderController.update);

routes.get('/notifications', NotificationController.index);
routes.get('/notifications/:notificationID', NotificationController.show);

routes.post('/sessions', SessionController.store);

routes.post('/posts',upload.single('thumbnail'), PostController.store)
routes.get('/posts', PostController.index)
routes.get('/posts/:postID', PostController.show)


routes.post('/favorites/:userID', FavoriteController.store);


routes.get('/', (req, res) => res.json({ msg: 'ok' }));

export default routes;
