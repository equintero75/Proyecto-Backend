const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Modelo de usuario
    required: true,
  },
  usuarioEnvio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Modelo de usuario para el envío (Domiciliario)
  },
  items: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto', // Modelo de producto
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
    },
  ],
  estado: {
    type: String,
    required: true,
    enum: ['creado','en-curso', 'en-camino', 'entregado'],
  },
  restaurante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurante',
    required: true,
  },
  fechaPedido: {
    type: Date,
    default: Date.now,
  },
  costoTotal: {
    type: Number,
    required: true,
  },
  tiempoEstimadoEnvio: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('pedido', pedidoSchema);
