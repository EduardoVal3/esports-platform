# eSports Platform - Plataforma de Torneos

Plataforma completa para gestión de torneos y competencias de eSports con arquitectura de microservicios.

## 🏗️ Arquitectura

- **Frontend**: Next.js 16 (App Router) + shadcn/ui + Tailwind CSS
- **Backend**: NestJS + TypeORM
- **Base de Datos**: PostgreSQL 15
- **Infraestructura**: Docker + Docker Compose
- **PWA**: Service Worker + Manifest

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker y Docker Compose instalados
- Node.js 20+ (solo para desarrollo local)
- Git

### Instalación con Docker (Recomendado)

1. **Clonar el repositorio**
\`\`\`bash
git clone <repository-url>
cd esports-platform
\`\`\`

2. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env
# Editar .env con tus configuraciones
\`\`\`

3. **Levantar toda la infraestructura**
\`\`\`bash
docker-compose up -d
\`\`\`

4. **Verificar que todo esté funcionando**
\`\`\`bash
# Ver logs
docker-compose logs -f

# Verificar servicios
docker-compose ps
\`\`\`

5. **Acceder a la aplicación**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Health Check: http://localhost:3001/api/health

### Detener los servicios

\`\`\`bash
docker-compose down
\`\`\`

### Limpiar todo (incluyendo volúmenes)

\`\`\`bash
docker-compose down -v
\`\`\`

## 🔧 Desarrollo Local (Sin Docker)

### Frontend

\`\`\`bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build de producción
npm run build
npm start
\`\`\`

### Backend

\`\`\`bash
cd backend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run start:dev

# Build de producción
npm run build
npm run start:prod
\`\`\`

## 🌐 Comunicación entre Servicios

Los contenedores se comunican a través de la red Docker `esports-network`:

- **Frontend → Backend**: `http://backend:3001`
- **Backend → Database**: `postgres://db:5432`
- **Externo → Frontend**: `http://localhost:3000`
- **Externo → Backend**: `http://localhost:3001`

## 📱 PWA (Progressive Web App)

La aplicación está configurada como PWA:

- **Manifest**: `/public/manifest.json`
- **Service Worker**: `/public/service-worker.js`
- **Registro**: Automático en `app/layout.tsx`
- **Iconos**: `/public/icon-192x192.png` y `/public/icon-512x512.png`

### Características PWA
- Modo standalone (sin barra de navegador)
- Instalable en dispositivos móviles y desktop
- Caché offline para recursos estáticos
- Theme color personalizado (#8b5cf6)

## 🔐 Variables de Entorno

### Variables Principales

\`\`\`env
# Database
DB_HOST=db
DB_PORT=5432
DB_USERNAME=esports_admin
DB_PASSWORD=your_secure_password
DB_DATABASE=esports_platform

# JWT
JWT_SECRET=minimum-32-characters-secret-key
JWT_EXPIRATION=7d

# URLs
NEXT_PUBLIC_API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
\`\`\`

## 📦 Estructura del Proyecto

\`\`\`
esports-platform/
├── app/                        # Next.js App Router
│   ├── dashboard/             # Admin dashboard
│   └── usuario/               # User settings
├── components/                # React components
├── backend/                   # NestJS backend
│   ├── src/
│   │   ├── modules/          # Feature modules
│   │   ├── common/           # Shared code
│   │   └── main.ts           # Entry point
│   └── Dockerfile            # Backend container
├── public/                    # Static assets
│   ├── manifest.json         # PWA manifest
│   └── service-worker.js     # Service worker
├── docker-compose.yml        # Services orchestration
├── Dockerfile                # Frontend container
└── .env                      # Environment variables
\`\`\`

## 🔨 Scripts Disponibles

### Frontend
- `npm run dev` - Desarrollo
- `npm run build` - Build de producción
- `npm start` - Ejecutar build
- `npm run lint` - Linter

### Backend
- `npm run start:dev` - Desarrollo con hot-reload
- `npm run build` - Compilar TypeScript
- `npm run start:prod` - Producción
- `npm run migration:generate` - Generar migración
- `npm run migration:run` - Ejecutar migraciones

### Docker
- `docker-compose up -d` - Levantar servicios
- `docker-compose down` - Detener servicios
- `docker-compose logs -f` - Ver logs
- `docker-compose ps` - Estado de servicios
- `docker-compose restart` - Reiniciar servicios

## 🐛 Troubleshooting

### El backend no conecta con la base de datos
\`\`\`bash
# Verificar que PostgreSQL esté corriendo
docker-compose logs db

# Verificar las variables de entorno
docker-compose exec backend env | grep DB_
\`\`\`

### El frontend no puede conectar con el backend
\`\`\`bash
# Verificar la URL del backend en el frontend
echo $NEXT_PUBLIC_API_URL

# Dentro del contenedor debe ser http://backend:3001
# Desde el navegador debe ser http://localhost:3001
\`\`\`

### Rebuild completo
\`\`\`bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
\`\`\`

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/usuarios` - Lista de usuarios
- `GET /api/usuarios/:id` - Usuario por ID
- `PUT /api/usuarios/:id` - Actualizar usuario

### Juegos
- `GET /api/juegos` - Lista de juegos
- `POST /api/juegos` - Crear juego (admin)
- `PUT /api/juegos/:id` - Actualizar juego (admin)

### Torneos
- `GET /api/torneos` - Lista de torneos
- `GET /api/torneos/:id` - Torneo por ID
- `POST /api/torneos` - Crear torneo

Ver documentación completa en `backend/SETUP.md`

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

MIT License - ver archivo LICENSE para más detalles
