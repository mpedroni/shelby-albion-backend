import { Router } from 'express';

import ItemController from './controllers/ItemController';

const routes: Router = Router({});

routes.get('/items/:id', ItemController.index);

export default routes;
