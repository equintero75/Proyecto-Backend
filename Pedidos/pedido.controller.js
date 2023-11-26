import Pedido from './pedido.model.js';

export async function getPedido(req, res) {
  try {
    const pedido = await Pedido.findById(req.params.id);

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al consultar el pedido por ID' });
  }
}

export async function getPedidoFiltros(req, res) {
  {
    try {
      // Inicializa un objeto vacío para construir la consulta
      const filters = {};

      // Verifica si se proporcionó un ID de usuario para filtrar pedidos realizados por ese usuario
      if (req.query.realizadoPor) {
        filters.usuario = req.query.realizadoPor;
      }

      // Verifica si se proporcionó un ID de usuario para filtrar pedidos enviados por ese usuario
      if (req.query.enviadoPor) {
        filters.usuarioEnvio = req.query.enviadoPor;
      }

      // Verifica si se proporcionó un ID de restaurante para filtrar pedidos a ese restaurante
      if (req.query.restaurante) {
        filters.restaurante = req.query.restaurante;
      }

      // Verifica si se proporcionaron fechas para filtrar pedidos dentro de un rango de fechas
      if (req.query.fechaInicio && req.query.fechaFin) {
        filters.fechaPedido = {
          $gte: new Date(req.query.fechaInicio),
          $lte: new Date(req.query.fechaFin),
        };
      }

      // Realiza la consulta basada en los filtros construidos
      const pedidos = await Pedido.find(filters);

      res.status(200).json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al consultar los pedidos por filtros' });
    }
  }
}
export async function getPedidoPendiente(req, res) {
  try {
    // Consulta los pedidos con el estado "en-curso" (o el estado que uses para pedidos no aceptados)
    const pedidosSinAceptar = await Pedido.find({ estado: 'creado' });

    res.status(200).json(pedidosSinAceptar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al consultar los pedidos enviados sin aceptar' });
  }
}
export async function createPedido(req, res) {
  try {
    const { usuarioId, restauranteId, items, costoEnvio, tiempoEstimadoEnvio } = req.body;

    // Verifica que todos los campos necesarios estén presentes en la solicitud

    if (!usuarioId || !restauranteId || !items || !costoEnvio || !tiempoEstimadoEnvio) {
      return res.status(400).json({ message: 'Faltan datos requeridos para crear el pedido' });
    }

    // Crea un nuevo pedido
    const nuevoPedido = new Pedido({
      usuario: usuarioId,
      restaurante: restauranteId,
      items,
      costoEnvio,
      tiempoEstimadoEnvio,
    });

    // Guarda el pedido en la base de datos
    await nuevoPedido.save();

    res.status(201).json({ message: 'Pedido creado exitosamente', pedido: nuevoPedido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
}

export async function patchPedido(req, res) {
  try {
    const pedidoId = req.params.id;
    const actualizaciones = req.body;

    // Verifica si el pedido existe
    const pedido = await Pedido.findById(pedidoId);

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    // Verifica si el pedido ya ha sido enviado
    if (pedido.estado === 'en-camino') {
      // Actualiza el pedido
      const pedidoActualizado = await Pedido.findByIdAndUpdate(pedidoId, actualizaciones, {
        new: true,
      });

      res.status(200).json(pedidoActualizado);
    } else {
      res.status(400).json({ message: 'No se puede modificar un pedido que ya ha sido enviado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al modificar el pedido' });
  }
}

export async function deletePedido(req, res) {
  try {
    const pedidoId = req.params.id;

    // Verifica si el pedido existe
    const pedido = await Pedido.findById(pedidoId);

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    // Elimina el pedido
    await Pedido.findByIdAndDelete(pedidoId);

    res.status(200).json({ message: 'Pedido eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el pedido' });
  }
}
