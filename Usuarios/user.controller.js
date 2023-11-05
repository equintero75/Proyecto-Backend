import User from './user.model';

export async function getUser(req, res) {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar el usuario' });
  }
}

export async function createUser(req, res) {
  try {
    const { email, name, password, phoneNumber, address, userType } = req.body;

    // Verifica si el correo electrónico ya está en uso
    const usuarioExistente = await UserModel.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    // Crea un nuevo usuario con los campos proporcionados
    const nuevoUsuario = new User({
      email,
      name,
      password,
      phoneNumber,
      address,
      userType,
    });

    await nuevoUsuario.save(); // Guarda el nuevo usuario en la base de datos

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
}

export async function patchUser(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await UserModel.findByIdAndRemove(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
}
