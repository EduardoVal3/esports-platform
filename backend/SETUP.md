# Guía de Instalación y Configuración del Backend

## Requisitos Previos

- Node.js v18 o superior
- PostgreSQL v14 o superior
- Docker y Docker Compose (opcional)

## Instalación Rápida

### 1. Instalar Dependencias

\`\`\`bash
cd backend
npm install
\`\`\`

### 2. Configurar Variables de Entorno

Copiar el archivo de ejemplo y configurar las variables:

\`\`\`bash
cp .env.example .env
\`\`\`

Editar el archivo \`.env\` con tus valores:

\`\`\`env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=esports_db
JWT_SECRET=genera-un-secret-aleatorio-seguro
PORT=3001
FRONTEND_URL=http://localhost:3000
\`\`\`

### 3. Iniciar Base de Datos

#### Opción A: Con Docker (Recomendado)

\`\`\`bash
docker-compose up -d
\`\`\`

Esto iniciará PostgreSQL en el puerto 5432 con las credenciales configuradas.

#### Opción B: PostgreSQL Local

Si tienes PostgreSQL instalado localmente, crea la base de datos:

\`\`\`bash
psql -U postgres
CREATE DATABASE esports_db;
\q
\`\`\`

### 4. Iniciar el Servidor

\`\`\`bash
# Modo desarrollo con hot-reload
npm run start:dev

# Modo producción
npm run build
npm run start:prod
\`\`\`

El servidor estará disponible en \`http://localhost:3001\`

## Estructura de la API

Todos los endpoints están bajo el prefijo \`/api\`:

### Autenticación

- **POST** \`/api/auth/register\` - Registro de usuario
- **POST** \`/api/auth/login\` - Inicio de sesión

### Usuarios

- **GET** \`/api/usuarios\` - Listar usuarios (autenticado)
- **GET** \`/api/usuarios/:id\` - Obtener usuario por ID (autenticado)
- **POST** \`/api/usuarios\` - Crear usuario (admin)
- **PATCH** \`/api/usuarios/:id\` - Actualizar usuario (autenticado)
- **DELETE** \`/api/usuarios/:id\` - Eliminar usuario (admin)
- **PATCH** \`/api/usuarios/:id/ban\` - Banear usuario (admin)
- **PATCH** \`/api/usuarios/:id/unban\` - Desbanear usuario (admin)

### Juegos

- **GET** \`/api/juegos\` - Listar juegos (público)
- **GET** \`/api/juegos/:id\` - Obtener juego por ID (público)
- **POST** \`/api/juegos\` - Crear juego (admin)
- **PATCH** \`/api/juegos/:id\` - Actualizar juego (admin)
- **DELETE** \`/api/juegos/:id\` - Eliminar juego (admin)

### Plataformas

- **GET** \`/api/plataformas\` - Listar plataformas (público)
- **GET** \`/api/plataformas/:id\` - Obtener plataforma por ID (público)
- **POST** \`/api/plataformas\` - Crear plataforma (admin)
- **PATCH** \`/api/plataformas/:id\` - Actualizar plataforma (admin)
- **DELETE** \`/api/plataformas/:id\` - Eliminar plataforma (admin)

### Modos de Juego

- **GET** \`/api/modos-juego\` - Listar modos de juego (público)
- **GET** \`/api/modos-juego/:id\` - Obtener modo por ID (público)
- **POST** \`/api/modos-juego\` - Crear modo (admin)
- **PATCH** \`/api/modos-juego/:id\` - Actualizar modo (admin)
- **DELETE** \`/api/modos-juego/:id\` - Eliminar modo (admin)

### Torneos

- **GET** \`/api/torneos\` - Listar torneos (público)
- **GET** \`/api/torneos/:id\` - Obtener torneo por ID (público)
- **POST** \`/api/torneos\` - Crear torneo (autenticado)
- **PATCH** \`/api/torneos/:id\` - Actualizar torneo (admin)
- **DELETE** \`/api/torneos/:id\` - Eliminar torneo (admin)
- **POST** \`/api/torneos/:id/join\` - Unirse a torneo (autenticado)
- **DELETE** \`/api/torneos/:id/leave\` - Salir de torneo (autenticado)

### Personas

- **GET** \`/api/personas\` - Listar personas (admin)
- **GET** \`/api/personas/:id\` - Obtener persona por ID (admin)
- **POST** \`/api/personas\` - Crear persona (admin)
- **PATCH** \`/api/personas/:id\` - Actualizar persona (admin)
- **DELETE** \`/api/personas/:id\` - Eliminar persona (admin)

## Autenticación

Para endpoints protegidos, incluir el token JWT en el header:

\`\`\`
Authorization: Bearer <tu_token_jwt>
\`\`\`

El token se obtiene al hacer login o registro:

\`\`\`bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "login": "usuario@example.com",
    "password": "password123"
  }'
\`\`\`

Respuesta:

\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "uuid",
    "nickname": "jugador1",
    "rol": "usuario"
  }
}
\`\`\`

## Roles

- **usuario**: Usuario estándar con acceso a sus propios recursos
- **admin**: Administrador con acceso completo

## Paginación

Los endpoints de listado soportan paginación:

\`\`\`
GET /api/usuarios?page=1&limit=10
GET /api/juegos?page=2&limit=20
GET /api/torneos?page=1&limit=15
\`\`\`

Respuesta:

\`\`\`json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
\`\`\`

## Búsqueda y Filtros

Algunos endpoints soportan búsqueda:

\`\`\`
GET /api/usuarios?search=jugador
GET /api/juegos?search=fortnite
GET /api/torneos?estado=upcoming&juegoId=uuid
GET /api/modos-juego?juegoId=uuid
\`\`\`

## Testing de Endpoints

### Ejemplo: Registro

\`\`\`bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "correo": "juan@example.com",
    "nickname": "juanp",
    "password": "password123",
    "fechaNacimiento": "1995-05-15",
    "genero": "masculino",
    "timezone": "America/Mexico_City"
  }'
\`\`\`

### Ejemplo: Crear Juego (Admin)

\`\`\`bash
curl -X POST http://localhost:3001/api/juegos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{
    "nombre": "Fortnite",
    "icono": "https://example.com/fortnite.png",
    "descripcion": "Battle Royale",
    "desarrollador": "Epic Games",
    "estado": "activo",
    "plataformaIds": ["uuid1", "uuid2"]
  }'
\`\`\`

### Ejemplo: Crear Torneo

\`\`\`bash
curl -X POST http://localhost:3001/api/torneos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <user_token>" \
  -d '{
    "titulo": "Torneo Fortnite Navidad 2024",
    "descripcion": "Competencia navideña",
    "juegoId": "uuid-del-juego",
    "plataforma": "PC",
    "modoJuego": "Battle Royale",
    "region": "América Latina",
    "tipoTorneo": "Eliminación Simple",
    "bestOf": 1,
    "formato": "Solo",
    "esCerrado": false,
    "tipoReglas": "basic",
    "permitePC": true,
    "requiereStream": false,
    "requiereWebcam": false,
    "tipoEntrada": "Teclado y Ratón",
    "maxParticipantes": 64,
    "fechaRegistroInicio": "2024-12-01T00:00:00Z",
    "fechaRegistroFin": "2024-12-15T23:59:59Z",
    "fechaInicio": "2024-12-20T18:00:00Z",
    "cuotaEntrada": 5.00,
    "pozoPremios": 300.00,
    "comisionHost": 10.00,
    "porcentajePrimero": 60.00,
    "porcentajeSegundo": 30.00,
    "hostContacto": "host@example.com"
  }'
\`\`\`

## Scripts Útiles

\`\`\`bash
# Desarrollo con watch
npm run start:dev

# Build para producción
npm run build

# Ejecutar en producción
npm run start:prod

# Linting
npm run lint

# Tests
npm run test
npm run test:watch
npm run test:cov

# TypeORM migrations
npm run migration:generate -- src/migrations/NombreMigracion
npm run migration:run
npm run migration:revert
\`\`\`

## Troubleshooting

### Error de conexión a la base de datos

Verificar que PostgreSQL esté corriendo:

\`\`\`bash
docker-compose ps
# o
psql -U postgres -c "SELECT version();"
\`\`\`

### Puerto ya en uso

Cambiar el puerto en el archivo \`.env\`:

\`\`\`env
PORT=3002
\`\`\`

### Problemas con TypeORM

Asegurarse de que las entidades estén correctamente importadas en \`app.module.ts\`

### Error de autenticación JWT

Verificar que \`JWT_SECRET\` esté configurado en \`.env\`
\`\`\`
