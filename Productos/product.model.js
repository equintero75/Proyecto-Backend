import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  restaurante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurante', // Nombre del modelo del restaurante
  },
});

export default mongoose.model('producto', productoSchema);
export { productoSchema };
