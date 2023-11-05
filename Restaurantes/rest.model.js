const mongoose = require('mongoose');

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
  tiempoEstimadoEnvio: {
    type: String,
    required: true,
  },
  costoEnvio: {
    type: Number,
    required: true,
  },
  menu: [
    {
      nombre: String,
      descripcion: String,
      precio: Number,
    },
  ],
});

export default mongoose.model('Restaurante', restauranteSchema);
