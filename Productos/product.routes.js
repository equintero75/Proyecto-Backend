import {
  createProduct,
  deleteProduct,
  getProducto,
  getProductos,
  patchProduct,
} from './product.controller.js';
import { requireAdminAuth } from '../Restaurantes/rest.controller.js';
import { Router } from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/product/search', requireAdminAuth, getProducto);
router.get('/product/searchf', requireAdminAuth, getProductos);

// Endpoint POST /prueba
router.post('/product/create', requireAdminAuth, createProduct);

// Endpoint PATCH /prueba
router.patch('/product/edit', requireAdminAuth, patchProduct);

// Endpoint DELETE /prueba
router.delete('/product/delete', requireAdminAuth, deleteProduct);

export default router;
