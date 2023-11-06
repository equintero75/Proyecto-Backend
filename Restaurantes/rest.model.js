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
  menu: [
    {
      nombre: String,
      descripcion: String,
      categoria: String,
      precio: Number,
    }
    ,
  ],
  administrador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Nombre del modelo de usuario (administrador)
  },
});

export default mongoose.model('Restaurante', restauranteSchema);
