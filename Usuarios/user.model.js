import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['cliente', 'administrador'],
    default: 'cliente', // Valor por defecto
    required: true
  },
});

export default mongoose.model('user', userSchema);
