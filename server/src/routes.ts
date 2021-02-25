import express from 'express';
import ClassesControllers from './controllers/ClassesControllers';
import ConnectionsCrontroller from './controllers/ConnectionsCrontroller';

const routes = express.Router();
const classesControllers = new ClassesControllers();
const connectionsController = new ConnectionsCrontroller();

routes.get('/classes',classesControllers.index);
routes.post('/classes',classesControllers.create);

routes.get('/connections',connectionsController.index);
routes.post('/connections',connectionsController.create)

export default routes;
