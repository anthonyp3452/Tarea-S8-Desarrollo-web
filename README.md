# Aplicación de Gestión de Productos

Una aplicación web completa con frontend y backend para gestionar productos utilizando Fastify y PostgreSQL.

## 🚀 Tecnologías

- **Backend**: Fastify (Node.js)
- **Base de Datos**: PostgreSQL
- **Frontend**: HTML, CSS, JavaScript
- **Infraestructura**: Docker Compose

## 📋 Requisitos

- Docker y Docker Compose
- Node.js (para desarrollo local)

## 🏃 Cómo Ejecutar la Aplicación

### Opción 1: Con Docker Compose (Recomendado)

1. **Clonar o descargar el proyecto**

2. **Levantar los servicios (base de datos y backend):**
   ```bash
   docker-compose up -d
   ```

3. **Abrir el frontend:**
   - Opción A: Abrir `frontend/index.html` en un navegador (usar Live Server en VS Code)
   - Opción B: Usar un servidor local:
     ```bash
     # Con Python
     cd frontend
     python -m http.server 8080
     ```
     Luego abrir http://localhost:8080 en el navegador

### Opción 2: Desarrollo Local

1. **Iniciar solo la base de datos:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Instalar dependencias del backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Ejecutar migraciones:**
   ```bash
   npm run migrate
   ```

4. **Iniciar el servidor backend:**
   ```bash
   npm start
   # o para desarrollo con nodemon:
   npm run dev
   ```

5. **Abrir el frontend** (usar Live Server o servidor local en el puerto 8080)

## 📁 Estructura del Proyecto

```
.
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── products.routes.js    # Rutas de la API
│   │   ├── database/
│   │   │   ├── db.js                 # Configuración de PostgreSQL
│   │   │   ├── migrate.js            # Script de migraciones
│   │   │   └── migrations/
│   │   │       └── 001_create_products_table.sql
│   │   └── server.js                 # Servidor Fastify
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── docker-compose.yml
└── README.md
```

## 🔌 API REST Endpoints

- **POST /productos** - Crear un nuevo producto
  ```json
  {
    "nombre": "Laptop Dell",
    "precio": 1299.99
  }
  ```

- **GET /productos** - Obtener todos los productos
  ```json
  {
    "products": [
      {
        "id": 1,
        "nombre": "Laptop Dell",
        "precio": "1299.99",
        "created_at": "2024-01-01T10:00:00.000Z"
      }
    ]
  }
  ```

- **DELETE /productos/:id** - Eliminar un producto por ID

- **GET /health** - Verificar estado del servidor

## 🛠️ Desarrollo

### Detener los servicios
```bash
docker-compose down
```

### Ver logs del backend
```bash
docker-compose logs -f backend
```

### Ver logs de PostgreSQL
```bash
docker-compose logs -f postgres
```

### Reconstruir imágenes
```bash
docker-compose up --build -d
```

### Limpiar todo (incluyendo volúmenes)
```bash
docker-compose down -v
```

## 📝 Notas

- El frontend se conecta a `http://localhost:3000` por defecto
- Los datos de PostgreSQL persisten en un volumen de Docker
- Para desarrollo, puedes usar `npm run dev` en el backend para reinicio automático
- Asegúrate de que el puerto 3000 (backend) y 5432 (PostgreSQL) estén disponibles

## 🐛 Solución de Problemas

### El backend no se conecta a PostgreSQL
Verifica que el contenedor de PostgreSQL esté corriendo:
```bash
docker-compose ps
```

### Error de migraciones
Ejecuta las migraciones manualmente:
```bash
cd backend
npm run migrate
```

### CORS errors
El backend ya tiene CORS habilitado para `origin: '*'`. Si persisten problemas, verifica que la URL de la API sea correcta en `frontend/app.js`.

## 📝 Autor

Desarrollado para la Tarea S8


