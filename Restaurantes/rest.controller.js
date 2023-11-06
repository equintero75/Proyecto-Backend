import Restaurante from './rest.model';

export async function getRestaurante(req,res) {
  try {
    const restauranteId = req.params.id;
    
    // Consulta el restaurante por su ID
    const restaurante = await Restaurante.findById(restauranteId);

    if (!restaurante) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    res.status(200).json(restaurante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al consultar el restaurante por ID' });
  }
};

export async function getRestauranteFiltro(req, res){
  try {
    const categoria = req.query.categoria; // Parámetro de categoría proporcionado en la solicitud
    const busqueda = req.query.busqueda; // Parámetro de búsqueda proporcionado en la solicitud

    const filters = {};

    // Aplica filtro por categoría si se proporciona
    if (categoria) {
      filters.categoria = categoria;
    }

    // Aplica filtro por nombre si se proporciona
    if (busqueda) {
      filters.nombre = { $regex: new RegExp(busqueda, 'i') }; // Búsqueda no sensible a mayúsculas y minúsculas
    }

    // Consulta restaurantes basados en los filtros
    const restaurantes = await Restaurante.find(filters);

    res.status(200).json(restaurantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al consultar restaurantes por categoría y/o búsqueda' });
  }
};

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

export async function patchRestaurante(req, res) {
  try {
    const restauranteId = req.params.id;
    const actualizaciones = req.body; // Datos de actualización proporcionados en el cuerpo de la solicitud

    // Verifica si el restaurante existe
    const restaurante = await Restaurante.findById(restauranteId);

    if (!restaurante) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    // Actualiza el restaurante con los datos proporcionados
    const restauranteActualizado = await Restaurante.findByIdAndUpdate(
      restauranteId,
      actualizaciones,
      { new: true }
    );

    res.status(200).json(restauranteActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el restaurante' });
  }
};

export async function deleteRestaurante(req, res) {
  try {
    const restauranteId = req.params.id;

    const restaurante = await Restaurante.findById(restauranteId);

    if (!restaurante) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    // Elimina el restaurante por su ID
    await Restaurante.findByIdAndDelete(restauranteId);

    res.status(200).json({ message: 'Restaurante eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el restaurante' });
  }
};

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