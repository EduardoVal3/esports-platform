# Arquitectura del Backend - eSports Platform

## Resumen Técnico

El backend de la plataforma está construido con **NestJS** y **TypeORM**, siguiendo una arquitectura modular y escalable.

### Stack Tecnológico

- **Framework**: NestJS 10.x
- **ORM**: TypeORM 0.3.x
- **Base de Datos**: PostgreSQL 16 (Alpine)
- **Autenticación**: JWT (passport-jwt)
- **Validación**: class-validator y class-transformer
- **Hash**: bcrypt
- **Containerización**: Docker

## Modelo de Datos

### Entidades Principales

#### 1. **Persona**
Datos personales básicos del usuario.
- Campos: nombre, apellido, correo, fechaNacimiento, genero, timezone
- Relación: OneToOne con Usuario

#### 2. **Usuario**
Cuenta principal del sistema con gamificación.
- Campos: nickname, password, rol, xp, nivel, saldo, creditos, avatar, bio
- Datos adicionales: enlacesSociales, idsJuegos, preferencias, infoSeguridad
- Relaciones:
  - OneToOne: Persona
  - ManyToMany: Amigos, Seguidores, Torneos, Logros
  - OneToMany: Equipos, Trofeos, EstadisticasJuegos, Transacciones

#### 3. **Juego**
Juegos disponibles en la plataforma.
- Campos: nombre, icono, descripcion, desarrollador, estado
- Relaciones:
  - ManyToMany: Plataformas
  - OneToMany: ModosJuego, Torneos, Estadisticas

#### 4. **Plataforma**
Plataformas de juego (PC, PS5, Xbox, Switch, etc.).
- Campos: nombre, codigo, icono
- Relaciones:
  - ManyToMany: Juegos

#### 5. **ModoJuego**
Modos específicos de cada juego.
- Campos: nombre, descripcion, minJugadores, maxJugadores
- Relaciones:
  - ManyToOne: Juego

#### 6. **Torneo**
Torneos de la plataforma con sistema de premios.
- Campos: titulo, descripcion, plataforma, modoJuego, region, tipoTorneo
- Configuración: bestOf, formato, esCerrado, tipoReglas, reglasCustom
- Requisitos: permitePC, requiereStream, requiereWebcam, tipoEntrada
- Participación: maxParticipantes, fechaRegistroInicio, fechaRegistroFin, fechaInicio
- Economía: cuotaEntrada, pozoPremios, comisionHost, porcentajePrimero, porcentajeSegundo
- Contacto: hostContacto, enlacesHost
- Media: banner, miniatura
- Relaciones:
  - ManyToOne: Juego, Usuario (creador)
  - ManyToMany: Usuarios (participantes)

#### 7. **Equipo**
Equipos creados por usuarios.
- Campos: nombre, descripcion, logo
- Relaciones:
  - ManyToOne: Usuario (creador)

#### 8. **Logro**
Logros desbloqueables.
- Campos: nombre, descripcion, icono, puntos
- Relaciones:
  - ManyToMany: Usuarios

#### 9. **Trofeo**
Trofeos obtenidos por usuarios.
- Campos: nombre, descripcion, icono
- Relaciones:
  - ManyToOne: Usuario

#### 10. **EstadisticaJuego**
Estadísticas de usuarios por juego.
- Campos: partidasJugadas, partidasGanadas, partidasPerdidas, porcentajeVictorias, horasJugadas
- Relaciones:
  - ManyToOne: Usuario, Juego

#### 11. **Transaccion**
Transacciones financieras.
- Campos: tipo, monto, estado, descripcion
- Relaciones:
  - ManyToOne: Usuario

## Módulos y Endpoints

### Auth Module
Manejo de autenticación y autorización.

**Endpoints:**
- `POST /api/auth/register` - Registro (público)
- `POST /api/auth/login` - Login (público)

**Características:**
- JWT con expiración configurable
- Hashing de contraseñas con bcrypt
- Strategy JWT personalizada
- Validación de credenciales

### Usuario Module
CRUD de usuarios con gamificación.

**Endpoints:**
- `GET /api/usuarios?page=1&limit=10&search=query` - Listar con paginación
- `GET /api/usuarios/:id` - Obtener por ID
- `POST /api/usuarios` - Crear (admin)
- `PATCH /api/usuarios/:id` - Actualizar
- `DELETE /api/usuarios/:id` - Eliminar (soft delete, admin)
- `PATCH /api/usuarios/:id/ban` - Banear (admin)
- `PATCH /api/usuarios/:id/unban` - Desbanear (admin)

**Características:**
- Sistema de niveles basado en XP
- Gestión de saldo y créditos
- Tracking de ganancias totales
- Soft delete (paranoid)
- Validación de unicidad de nickname

### Persona Module
CRUD de información personal.

**Endpoints:**
- `GET /api/personas?page=1&limit=10` - Listar (admin)
- `GET /api/personas/:id` - Obtener por ID (admin)
- `POST /api/personas` - Crear (admin)
- `PATCH /api/personas/:id` - Actualizar (admin)
- `DELETE /api/personas/:id` - Eliminar (soft delete, admin)

**Características:**
- Validación de correo único
- Validación de formato de fecha
- Soft delete

### Juego Module
CRUD de juegos.

**Endpoints:**
- `GET /api/juegos?page=1&limit=10&search=query` - Listar (público)
- `GET /api/juegos/:id` - Obtener por ID (público)
- `POST /api/juegos` - Crear (admin)
- `PATCH /api/juegos/:id` - Actualizar (admin)
- `DELETE /api/juegos/:id` - Eliminar (soft delete, admin)

**Características:**
- Búsqueda por nombre
- Asociación con plataformas
- Soft delete
- Estados: activo/inactivo

### Plataforma Module
CRUD de plataformas de juego.

**Endpoints:**
- `GET /api/plataformas?page=1&limit=10` - Listar (público)
- `GET /api/plataformas/:id` - Obtener por ID (público)
- `POST /api/plataformas` - Crear (admin)
- `PATCH /api/plataformas/:id` - Actualizar (admin)
- `DELETE /api/plataformas/:id` - Eliminar (soft delete, admin)

**Características:**
- Validación de nombre y código únicos
- Soft delete

### ModoJuego Module
CRUD de modos de juego.

**Endpoints:**
- `GET /api/modos-juego?page=1&limit=10&juegoId=uuid` - Listar (público)
- `GET /api/modos-juego/:id` - Obtener por ID (público)
- `POST /api/modos-juego` - Crear (admin)
- `PATCH /api/modos-juego/:id` - Actualizar (admin)
- `DELETE /api/modos-juego/:id` - Eliminar (soft delete, admin)

**Características:**
- Filtrado por juego
- Validación de unicidad de nombre por juego
- Validación de rango de jugadores
- Soft delete

### Torneo Module
CRUD de torneos con sistema de participación.

**Endpoints:**
- `GET /api/torneos?page=1&limit=10&estado=upcoming&juegoId=uuid` - Listar (público)
- `GET /api/torneos/:id` - Obtener por ID (público)
- `POST /api/torneos` - Crear (autenticado)
- `PATCH /api/torneos/:id` - Actualizar (admin)
- `DELETE /api/torneos/:id` - Eliminar (soft delete, admin)
- `POST /api/torneos/:id/join` - Unirse (autenticado)
- `DELETE /api/torneos/:id/leave` - Salir (autenticado)

**Características:**
- Filtrado por estado y juego
- Validación de fechas (registro antes del inicio)
- Validación de porcentajes de premios
- Validación de participantes máximos
- Sistema de inscripción con control de cupos
- Soft delete
- Estados: upcoming, live, finished, cancelled

## Sistema de Autenticación y Autorización

### Guards

#### 1. **JwtAuthGuard**
- Valida token JWT en cada request
- Extrae usuario del payload
- Permite endpoints públicos con decorator `@Public()`

#### 2. **RolesGuard**
- Valida roles requeridos
- Usa decorator `@Roles('admin', 'usuario')`
- Se ejecuta después de JwtAuthGuard

### Decorators

#### 1. **@Public()**
Marca endpoints como públicos (sin autenticación).

```typescript
@Public()
@Get('juegos')
findAll() { ... }
```

#### 2. **@Roles(...roles)**
Define roles permitidos para un endpoint.

```typescript
@Roles('admin')
@Delete(':id')
remove(@Param('id') id: string) { ... }
```

## Validaciones con DTOs

Todos los DTOs utilizan decoradores de `class-validator`:

- `@IsString()` - Validar strings
- `@IsEmail()` - Validar emails
- `@IsUUID()` - Validar UUIDs
- `@IsInt()`, `@IsNumber()` - Validar números
- `@IsBoolean()` - Validar booleanos
- `@IsDateString()` - Validar fechas ISO
- `@IsEnum()` - Validar valores enum
- `@IsOptional()` - Campos opcionales
- `@MinLength()`, `@MaxLength()` - Longitud de strings
- `@Min()`, `@Max()` - Rango de números
- `@IsArray()` - Validar arrays
- `@IsObject()` - Validar objetos

### Ejemplo de DTO

```typescript
export class CreateTorneoDto {
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  titulo: string;

  @IsUUID()
  juegoId: string;

  @IsInt()
  @Min(2)
  maxParticipantes: number;

  @IsDateString()
  fechaInicio: string;
}
```

## Paginación y Búsqueda

Todos los endpoints de listado soportan:

### Paginación
```
GET /api/usuarios?page=1&limit=10
```

Respuesta:
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Búsqueda
```
GET /api/usuarios?search=jugador
GET /api/juegos?search=fortnite
```

Usa `LIKE` case-insensitive en TypeORM.

### Filtros
```
GET /api/torneos?estado=upcoming
GET /api/torneos?juegoId=uuid-del-juego
GET /api/modos-juego?juegoId=uuid-del-juego
```

## Soft Delete

Las entidades principales usan soft delete:
- Usuario
- Persona
- Juego
- Plataforma
- ModoJuego
- Torneo

Esto permite:
- Mantener histórico de datos
- Recuperar registros eliminados
- Cumplir con regulaciones de datos

```typescript
@DeleteDateColumn({ name: 'deleted_at' })
deletedAt?: Date;
```

## Manejo de Errores

El backend utiliza excepciones estándar de NestJS:

- `BadRequestException` (400) - Datos inválidos
- `UnauthorizedException` (401) - Sin autenticación
- `ForbiddenException` (403) - Sin permisos
- `NotFoundException` (404) - Recurso no encontrado
- `ConflictException` (409) - Conflicto (duplicados)
- `InternalServerErrorException` (500) - Error del servidor

### Formato de Respuesta de Error

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

## Variables de Entorno

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=esports_admin
DB_PASSWORD=esports_password_2024
DB_DATABASE=esports_platform

# Aplicación
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=esports-secret-key-development-2024
JWT_EXPIRES_IN=7d

# Uploads
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

## Estructura de Carpetas

```
backend/
├── src/
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── public.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   └── guards/
│   │       ├── jwt-auth.guard.ts
│   │       └── roles.guard.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── strategies/
│   │   │   │   └── jwt.strategy.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   ├── persona/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── persona.controller.ts
│   │   │   ├── persona.module.ts
│   │   │   └── persona.service.ts
│   │   ├── usuario/
│   │   ├── juego/
│   │   ├── plataforma/
│   │   ├── modo-juego/
│   │   ├── torneo/
│   │   ├── equipo/
│   │   ├── logro/
│   │   ├── trofeo/
│   │   ├── estadistica-juego/
│   │   └── transaccion/
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── uploads/
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

## Buenas Prácticas Implementadas

1. **Separación de Responsabilidades**: Cada módulo maneja una entidad específica
2. **DTOs para Validación**: Validación estricta de entrada de datos
3. **Guards Reutilizables**: Autenticación y autorización centralizadas
4. **Soft Delete**: Preservación de datos históricos
5. **Paginación Estándar**: Respuestas consistentes con metadata
6. **Búsqueda Flexible**: Filtros y búsqueda por texto
7. **Relaciones Eficientes**: Uso de eager/lazy loading según necesidad
8. **Índices en BD**: Campos frecuentemente consultados indexados
9. **Tipos Seguros**: TypeScript estricto en toda la aplicación
10. **Documentación**: Comentarios JSDoc en entidades

## Próximas Mejoras Sugeridas

- [ ] Implementar módulos faltantes (Equipo, Logro, Trofeo, etc.)
- [ ] Sistema de notificaciones en tiempo real (WebSockets)
- [ ] Sistema de chat entre usuarios
- [ ] Sistema de reportes y moderación
- [ ] Estadísticas y dashboards para admins
- [ ] Sistema de rankings global
- [ ] Integración con APIs de juegos (Riot, Steam, etc.)
- [ ] Sistema de pagos (Stripe, PayPal)
- [ ] Generación automática de brackets para torneos
- [ ] Sistema de streaming en vivo
- [ ] Rate limiting y throttling
- [ ] Logging centralizado
- [ ] Monitoreo y métricas (Prometheus, Grafana)
- [ ] Tests unitarios y e2e
- [ ] Documentación Swagger/OpenAPI
- [ ] CI/CD pipeline
