import {
  createRestaurante,
  deleteEmpanada,
  deleteRestaurante,
  getRestaurante,
  getRestauranteFiltro,
  patchRestaurante,
  requireAdminAuth,
} from './rest.controller';
import { Router } from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/restaurante/search', getRestaurante);
router.get('/restaurante/searchf', getRestauranteFiltro);
// Endpoint POST /prueba
router.post('/rest/create', requireAdminAuth, createRestaurante);

// Endpoint PATCH /prueba
router.patch('/restaurante/edit', requireAdminAuth, patchRestaurante);

// Endpoint DELETE /prueba
router.delete('/restaurante/delete', requireAdminAuth, deleteRestaurante);

export default router;
