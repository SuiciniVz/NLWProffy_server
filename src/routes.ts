import express from 'express';
import ClassController from './controllers/ClassController';

const routes = express.Router();

const classController = new ClassController();
// GET: Busca ou atualiza uma informação
// POST: Cria alguma informação
// PUT: Atualiza uma informação ja existente
// DELETE: Deleta uma informação ja existente


routes.get('/classes', classController.index);
routes.post('/classes', classController.create);

export default routes;