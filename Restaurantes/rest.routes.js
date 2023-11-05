import {
  createRestaurante,
  deleteEmpanada,
  getEmpanada,
  patchEmpanada,
  requireAdminAuth,
} from './rest.controller';
import { Router } from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getEmpanada);

// Endpoint POST /prueba
router.post('/rest/create', requireAdminAuth, createRestaurante);

// Endpoint PATCH /prueba
router.patch('/', patchEmpanada);

// Endpoint DELETE /prueba
router.delete('/', deleteEmpanada);

export default router;
