const mongoose = require('mongoose');
const productoSchema = require('../Productos/product.model')

const restauranteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  productos: [productoSchema],
  administrador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Nombre del modelo de usuario (administrador)
    required: true,
  },
});

export default mongoose.model('Restaurante', restauranteSchema);
