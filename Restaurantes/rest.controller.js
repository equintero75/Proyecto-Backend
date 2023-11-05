import Restaurante from './rest.model';
export async function getEmpanada(req,res) {
  // const { name } = req.query;

  const empanadas = await Empanada.find(req.query);

  res.status(200).json(empanadas);
}

export async function createRestaurante(req, res){
  try {
    const { nombre, direccion, categoria } = req.body;

    // Obtiene el ID del administrador autenticado
    const administradorId = req.user._id;

    // Crea un nuevo restaurante asociado al administrador
    const restaurante = new Restaurante({ nombre, direccion, categoria, administrador: administradorId });

    await restaurante.save();
    res.status(201).json({ message: 'Restaurante creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el restaurante' });
  }
};

export async function patchEmpanada(req, res) {
  res.status(200).json({});
}

export async function deleteEmpanada(req, res) {
  res.status(200).json({});
}

export async function requireAdminAuth(req, res, next){
  try {
    const esAdmin = await verificarSiEsAdmin(req.user);

    if (esAdmin) {
      // El usuario es un administrador, permite continuar
      next();
    } else {
      res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al verificar si eres administrador' });
  }
};
const verificarSiEsAdmin = async (usuario) => {
  return usuario.userType === 'administrador';
};