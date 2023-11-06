import {
  createPedido,
  deleteEmpanada,
  getPedido,
  getPedidoFiltros,
  getPedidoPendiente,
  patchEmpanada,
} from './pedido.controller';
import { requireAdminAuth } from '../Restaurantes/rest.controller';
import { Router } from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getPedido);
router.get('/', getPedidoFiltros);
router.get('/', getPedidoPendiente);

// Endpoint POST /prueba
router.post('/', createPedido);

// Endpoint PATCH /prueba
router.patch('/', patchEmpanada);

// Endpoint DELETE /prueba
router.delete('/', deleteEmpanada);

export default router;
