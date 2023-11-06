
import Producto from './product.model';

export async function getProducto(req,res){
  try {
    const productoId = req.params.productoId;

    const producto = await Producto.findById(productoId);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};
export async function getProductos(req, res){
  try {
    const { restauranteId, categoria } = req.query; // Parámetros de consulta para restaurante y categoría

    const filtro = {};

    if (restauranteId) {
      filtro.restaurante = restauranteId;
    }

    if (categoria) {
      filtro.categoria = categoria;
    }

    const productos = await Producto.find(filtro);
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

export async function createProduct(req, res){
  try {
    const { nombre, descripcion, categoria, precio } = req.body;
    const restauranteId = req.params.restauranteId;

    // Crea un nuevo producto asociado al restaurante
    const producto = new Producto({
      nombre,
      descripcion,
      categoria,
      precio,
      restaurante: restauranteId,
    });

    await producto.save();
    res.status(201).json({ message: 'Producto agregado al inventario exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el producto al inventario' });
  }
};

export async function patchProduct(req, res){
  try {
    const productoId = req.params.productoId;
    const restauranteId = req.params.restauranteId;
    const { nombre, descripcion, categoria, precio } = req.body;

    // Verifica si el producto pertenece al restaurante
    const producto = await Producto.findOne({ _id: productoId, restaurante: restauranteId });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado en el inventario' });
    }

    // Actualiza solo los campos proporcionados en la solicitud
    if (nombre) {
      producto.nombre = nombre;
    }
    if (descripcion) {
      producto.descripcion = descripcion;
    }
    if (categoria) {
      producto.categoria = categoria;
    }
    if (precio) {
      producto.precio = precio;
    }

    await producto.save();
    res.status(200).json({ message: 'Producto modificado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al modificar el producto' });
  }
};

export async function deleteProduct(req, res){
  try {
    const productoId = req.params.productoId;
    const restauranteId = req.params.restauranteId;

    // Verifica si el producto pertenece al restaurante
    const producto = await Producto.findOne({ _id: productoId, restaurante: restauranteId });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado en el inventario' });
    }

    // Elimina el producto
    await producto.remove();
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
}