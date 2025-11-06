const pool = require('../database/db');

async function productsRoutes(fastify, options) {
  // GET all products
  fastify.get('/productos', async (request, reply) => {
    try {
      const result = await pool.query('SELECT * FROM productos ORDER BY id DESC');
      return { products: result.rows };
    } catch (error) {
      reply.code(500);
      return { error: 'Error fetching products', message: error.message };
    }
  });

  // POST create a new product
  fastify.post('/productos', async (request, reply) => {
    const { nombre, precio } = request.body;

    if (!nombre || precio === undefined) {
      reply.code(400);
      return { error: 'Nombre and precio are required' };
    }

    try {
      const result = await pool.query(
        'INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *',
        [nombre, precio]
      );
      reply.code(201);
      return { product: result.rows[0] };
    } catch (error) {
      reply.code(500);
      return { error: 'Error creating product', message: error.message };
    }
  });

  // DELETE a product by id
  fastify.delete('/productos/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      const result = await pool.query(
        'DELETE FROM productos WHERE id = $1 RETURNING *',
        [id]
      );

      if (result.rows.length === 0) {
        reply.code(404);
        return { error: 'Product not found' };
      }

      return { message: 'Product deleted successfully', product: result.rows[0] };
    } catch (error) {
      reply.code(500);
      return { error: 'Error deleting product', message: error.message };
    }
  });
}

module.exports = productsRoutes;


