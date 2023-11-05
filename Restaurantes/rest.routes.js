import { createEmpanada, deleteEmpanada, getEmpanada, patchEmpanada, requireAdminAuth } from "./rest.controller";
import {Router} from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getEmpanada );

// Endpoint POST /prueba
router.post('/', requireAdminAuth, createEmpanada );

// Endpoint PATCH /prueba
router.patch('/', patchEmpanada );

// Endpoint DELETE /prueba
router.delete('/', deleteEmpanada );

export default router;