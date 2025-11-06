require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const productsRoutes = require('./routes/products.routes');

// Register CORS plugin
fastify.register(require('@fastify/cors'), {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
});

// Register routes
fastify.register(productsRoutes);

// Health check route
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', message: 'Server is running' };
});

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server is running on http://0.0.0.0:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

