import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import TakeOutController from './app/controllers/TakeOutController';
import CompleteController from './app/controllers/CompleteController';
import DeliveryStatusController from './app/controllers/DeliveryStatusController';
import ProblemController from './app/controllers/ProblemController';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id/deliveries', DeliveryStatusController.index);

routes.put(
  '/deliveryman/:deliveryman_id/delivery/:id',
  TakeOutController.update
);

routes.put(
  '/deliveryman/:deliveryman_id/complete/:delivery_id',
  CompleteController.update
);

routes.post('/delivery/:delivery_id/problems', ProblemController.store);
routes.get('/delivery/:delivery_id/problems', ProblemController.show);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

routes.get('/problems', ProblemController.index);
routes.delete('/problem/:id/cancel-delivery', ProblemController.delete);

export default routes;
