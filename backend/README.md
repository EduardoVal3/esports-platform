# Esports Platform Backend - NestJS

Backend completo con TypeORM, PostgreSQL, autenticación JWT y autorización por roles.

## Stack Tecnológico

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **class-validator** - Validación de DTOs
- **bcrypt** - Hash de contraseñas
- **Docker** - Contenedores

## Instalación

\`\`\`bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Levantar base de datos con Docker
docker-compose up -d

# Ejecutar migraciones (si las hay)
npm run migration:run

# Iniciar en modo desarrollo
npm run start:dev
\`\`\`

## Estructura del Proyecto

\`\`\`
backend/
├── src/
│   ├── common/
│   │   ├── decorators/     # Decoradores personalizados
│   │   └── guards/         # Guards de autenticación y roles
│   ├── modules/
│   │   ├── auth/           # Autenticación JWT
│   │   ├── persona/        # CRUD Personas
│   │   ├── usuario/        # CRUD Usuarios
│   │   ├── juego/          # CRUD Juegos
│   │   ├── plataforma/     # CRUD Plataformas
│   │   ├── modo-juego/     # CRUD Modos de Juego
│   │   └── torneo/         # CRUD Torneos
│   ├── app.module.ts
│   └── main.ts
├── .env.example
├── docker-compose.yml
├── Dockerfile
└── package.json
\`\`\`

## Endpoints Principales

### Autenticación

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login

### Usuarios

- `GET /api/usuarios?page=1&limit=10&search=query` - Listar (con paginación)
- `GET /api/usuarios/:id` - Obtener por ID
- `POST /api/usuarios` - Crear (admin)
- `PATCH /api/usuarios/:id` - Actualizar
- `DELETE /api/usuarios/:id` - Eliminar (admin)
- `PATCH /api/usuarios/:id/ban` - Banear (admin)
- `PATCH /api/usuarios/:id/unban` - Desbanear (admin)

### Juegos

- `GET /api/juegos?page=1&limit=10&search=query` - Listar (público)
- `GET /api/juegos/:id` - Obtener por ID (público)
- `POST /api/juegos` - Crear (admin)
- `PATCH /api/juegos/:id` - Actualizar (admin)
- `DELETE /api/juegos/:id` - Eliminar (admin)

### Plataformas

- `GET /api/plataformas?page=1&limit=10` - Listar (público)
- `GET /api/plataformas/:id` - Obtener por ID (público)
- `POST /api/plataformas` - Crear (admin)
- `PATCH /api/plataformas/:id` - Actualizar (admin)
- `DELETE /api/plataformas/:id` - Eliminar (admin)

### Modos de Juego

- `GET /api/modos-juego?page=1&limit=10&juegoId=uuid` - Listar (público)
- `GET /api/modos-juego/:id` - Obtener por ID (público)
- `POST /api/modos-juego` - Crear (admin)
- `PATCH /api/modos-juego/:id` - Actualizar (admin)
- `DELETE /api/modos-juego/:id` - Eliminar (admin)

### Torneos

- `GET /api/torneos?page=1&limit=10&estado=upcoming&juegoId=uuid` - Listar (público)
- `GET /api/torneos/:id` - Obtener por ID (público)
- `POST /api/torneos` - Crear (autenticado)
- `PATCH /api/torneos/:id` - Actualizar (admin)
- `DELETE /api/torneos/:id` - Eliminar (admin)
- `POST /api/torneos/:id/join` - Unirse a torneo (autenticado)
- `DELETE /api/torneos/:id/leave` - Salir de torneo (autenticado)

### Personas

- `GET /api/personas?page=1&limit=10` - Listar (admin)
- `GET /api/personas/:id` - Obtener por ID (admin)
- `POST /api/personas` - Crear (admin)
- `PATCH /api/personas/:id` - Actualizar (admin)
- `DELETE /api/personas/:id` - Eliminar (admin)

## Autenticación

Todos los endpoints (excepto los marcados con `@Public()`) requieren un token JWT en el header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

## Roles

- **usuario**: Usuario estándar
- **admin**: Administrador con acceso completo

## Validaciones

Todos los DTOs utilizan class-validator para validaciones estrictas:

- Campos requeridos
- Tipos de datos
- Longitudes máximas
- Formatos (email, UUID, fecha)
- Valores enum

## Manejo de Errores

El backend utiliza HttpException de NestJS:

- `400 Bad Request` - Datos inválidos
- `401 Unauthorized` - Token inválido o ausente
- `403 Forbidden` - Sin permisos
- `404 Not Found` - Recurso no encontrado
- `409 Conflict` - Conflicto (duplicados)

## Archivos Generados

### Módulos de Autenticación
- `src/modules/auth/auth.module.ts`
- `src/modules/auth/auth.service.ts`
- `src/modules/auth/auth.controller.ts`
- `src/modules/auth/dto/register.dto.ts`
- `src/modules/auth/dto/login.dto.ts`
- `src/modules/auth/strategies/jwt.strategy.ts`

### Decoradores y Guards
- `src/common/decorators/roles.decorator.ts`
- `src/common/decorators/public.decorator.ts`
- `src/common/guards/jwt-auth.guard.ts`
- `src/common/guards/roles.guard.ts`

### Módulo Persona
- `src/modules/persona/persona.module.ts`
- `src/modules/persona/persona.service.ts`
- `src/modules/persona/persona.controller.ts`
- `src/modules/persona/dto/create-persona.dto.ts`
- `src/modules/persona/dto/update-persona.dto.ts`

### Módulo Usuario
- `src/modules/usuario/usuario.module.ts`
- `src/modules/usuario/usuario.service.ts`
- `src/modules/usuario/usuario.controller.ts`
- `src/modules/usuario/dto/create-usuario.dto.ts`
- `src/modules/usuario/dto/update-usuario.dto.ts`

### Módulo Juego
- `src/modules/juego/juego.module.ts`
- `src/modules/juego/juego.service.ts`
- `src/modules/juego/juego.controller.ts`
- `src/modules/juego/dto/create-juego.dto.ts`
- `src/modules/juego/dto/update-juego.dto.ts`

### Módulo Plataforma
- `src/modules/plataforma/plataforma.module.ts`
- `src/modules/plataforma/plataforma.service.ts`
- `src/modules/plataforma/plataforma.controller.ts`
- `src/modules/plataforma/dto/create-plataforma.dto.ts`
- `src/modules/plataforma/dto/update-plataforma.dto.ts`

### Módulo Modo Juego
- `src/modules/modo-juego/modo-juego.module.ts`
- `src/modules/modo-juego/modo-juego.service.ts`
- `src/modules/modo-juego/modo-juego.controller.ts`
- `src/modules/modo-juego/dto/create-modo-juego.dto.ts`
- `src/modules/modo-juego/dto/update-modo-juego.dto.ts`

### Módulo Torneo
- `src/modules/torneo/torneo.module.ts`
- `src/modules/torneo/torneo.service.ts`
- `src/modules/torneo/torneo.controller.ts`
- `src/modules/torneo/dto/create-torneo.dto.ts`
- `src/modules/torneo/dto/update-torneo.dto.ts`

### Configuración
- `src/app.module.ts` (actualizado con todos los módulos)
- `.env.example`
- `README.md`
