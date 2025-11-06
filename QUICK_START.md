# 🚀 Inicio Rápido

## Pasos Rápidos

### 1. Ejecutar la aplicación con Docker Compose
```bash
docker-compose up -d
```

Esto iniciará:
- PostgreSQL en el puerto 5432
- Backend Fastify en el puerto 3000

### 2. Abrir el Frontend

Abre `frontend/index.html` en tu navegador usando:
- **VS Code**: Click derecho → "Open with Live Server"
- **O** cualquier servidor HTTP local en el puerto 8080

### 3. ¡Listo!

La aplicación está lista para usar:
- ✅ Agregar productos
- ✅ Ver productos
- ✅ Eliminar productos

## Verificar que todo funciona

1. **Health check del backend:**
   ```
   http://localhost:3000/health
   ```
   Debería responder: `{"status":"ok","message":"Server is running"}`

2. **Ver productos:**
   ```
   http://localhost:3000/productos
   ```
   Debería responder con una lista vacía al inicio: `{"products":[]}`

## Comandos útiles

### Ver logs
```bash
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Detener servicios
```bash
docker-compose down
```

### Reiniciar servicios
```bash
docker-compose restart
```

### Limpiar todo (incluyendo datos)
```bash
docker-compose down -v
```

## Estructura de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/productos` | Crear producto |
| GET | `/productos` | Listar productos |
| DELETE | `/productos/:id` | Eliminar producto |

## Formato de los datos

### Crear producto (POST /productos)
```json
{
  "nombre": "Laptop Dell",
  "precio": 1299.99
}
```

### Respuesta
```json
{
  "product": {
    "id": 1,
    "nombre": "Laptop Dell",
    "precio": "1299.99",
    "created_at": "2024-01-01T10:00:00.000Z"
  }
}
```

## Solución de Problemas

### Error: "Cannot connect to database"
Ejecuta las migraciones manualmente:
```bash
docker-compose exec backend npm run migrate
```

### Error CORS en el frontend
Verifica que el backend esté corriendo en el puerto 3000:
```bash
curl http://localhost:3000/health
```

### Puerto 3000 o 5432 ya en uso
Edita `docker-compose.yml` y cambia los puertos:
```yaml
ports:
  - "3001:3000"  # Cambia 3000 por 3001
```





