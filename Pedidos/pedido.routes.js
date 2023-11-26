import {
  createPedido,
  deletePedido,
  getPedido,
  getPedidoFiltros,
  getPedidoPendiente,
  patchPedido,
} from './pedido.controller.js';
import { Router } from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/pedido/buscar', getPedido);
router.get('/pedido/buscarf', getPedidoFiltros);
router.get('/pedido/pendientes', getPedidoPendiente);

// Endpoint POST /prueba
router.post('/pedido/crear', createPedido);

// Endpoint PATCH /prueba
router.patch('/pedido/editar', patchPedido);

// Endpoint DELETE /prueba
router.delete('/pedido/cancel', deletePedido);

export default router;
