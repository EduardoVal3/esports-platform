# 🐳 Guía Completa de Docker

## Resumen de Infraestructura

Esta aplicación utiliza Docker Compose con 3 servicios principales:

1. **db** (PostgreSQL 15) - Base de datos
2. **backend** (NestJS) - API REST
3. **frontend** (Next.js 16) - Aplicación web

### Comunicación entre Servicios

\`\`\`
┌─────────────┐     HTTP      ┌─────────────┐    PostgreSQL   ┌─────────────┐
│             │  ────────────> │             │  ─────────────> │             │
│  Frontend   │   Port 3001   │   Backend   │   Port 5432    │  Database   │
│  (Next.js)  │               │  (NestJS)   │                │ (PostgreSQL)│
│             │ <──────────── │             │ <───────────── │             │
└─────────────┘               └─────────────┘                └─────────────┘
  Port: 3000                    Port: 3001                     Port: 5432
\`\`\`

## 🚀 Comandos Principales

### Iniciar Todos los Servicios

\`\`\`bash
docker-compose up -d
\`\`\`

Esto hará:
1. Descargar imágenes necesarias (primera vez)
2. Crear la red `esports-network`
3. Crear volumen `postgres_data` para persistencia
4. Iniciar PostgreSQL y esperar health check
5. Iniciar Backend y esperar que DB esté lista
6. Iniciar Frontend y conectar con Backend

### Ver Estado de Servicios

\`\`\`bash
docker-compose ps
\`\`\`

### Ver Logs

\`\`\`bash
# Todos los servicios
docker-compose logs -f

# Servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
\`\`\`

### Detener Servicios

\`\`\`bash
# Detener pero mantener contenedores
docker-compose stop

# Detener y eliminar contenedores
docker-compose down

# Eliminar contenedores y volúmenes (CUIDADO: borra la DB)
docker-compose down -v
\`\`\`

### Reiniciar Servicios

\`\`\`bash
# Todos
docker-compose restart

# Uno específico
docker-compose restart backend
\`\`\`

## 🔧 Desarrollo

### Rebuild de Imágenes

Cuando cambias el código o dependencias:

\`\`\`bash
# Rebuild todo
docker-compose build

# Rebuild sin caché (más lento pero seguro)
docker-compose build --no-cache

# Rebuild un servicio específico
docker-compose build frontend
\`\`\`

### Ejecutar Comandos Dentro de Contenedores

\`\`\`bash
# Backend
docker-compose exec backend npm run migration:generate
docker-compose exec backend npm run migration:run

# Acceder a shell
docker-compose exec backend sh
docker-compose exec frontend sh

# PostgreSQL
docker-compose exec db psql -U esports_admin -d esports_platform
\`\`\`

### Ver Variables de Entorno

\`\`\`bash
docker-compose exec backend env
docker-compose exec frontend env
\`\`\`

## 📦 Dockerfiles Explicados

### Frontend Dockerfile (Multi-stage)

\`\`\`dockerfile
# Stage 1: deps - Instala dependencias
FROM node:20-alpine AS deps
COPY package*.json ./
RUN npm ci

# Stage 2: builder - Build de Next.js
FROM node:20-alpine AS builder
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Stage 3: production - Imagen final optimizada
FROM node:20-alpine AS production
COPY --from=builder /app/.next/standalone ./
CMD ["node", "server.js"]
\`\`\`

**Beneficios:**
- Imagen final pequeña (~150MB vs ~1GB)
- Sin dependencias de desarrollo
- Solo código compilado

### Backend Dockerfile (Multi-stage)

\`\`\`dockerfile
# Stage 1: deps - Solo prod dependencies
FROM node:20-alpine AS deps
RUN npm ci --only=production

# Stage 2: builder - Build de NestJS
FROM node:20-alpine AS builder
RUN npm ci
RUN npm run build

# Stage 3: production - Imagen final
FROM node:20-alpine AS production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main"]
\`\`\`

## 🌐 Configuración de Red

### Red Docker: esports-network

Todos los servicios están en la misma red bridge. Esto permite:

- Comunicación por nombre de servicio: `http://backend:3001`
- Aislamiento de otras aplicaciones
- DNS automático

### Puertos Expuestos

\`\`\`yaml
services:
  db:
    ports:
      - "5432:5432"  # Host:Container
  backend:
    ports:
      - "3001:3001"
  frontend:
    ports:
      - "3000:3000"
\`\`\`

## 💾 Volúmenes y Persistencia

### Volumen de PostgreSQL

\`\`\`yaml
volumes:
  postgres_data:
    driver: local
\`\`\`

Los datos de la DB persisten incluso si detienes contenedores.

Para eliminar datos:
\`\`\`bash
docker-compose down -v
\`\`\`

### Volumen de Uploads (Backend)

\`\`\`yaml
volumes:
  - ./backend/uploads:/app/uploads
\`\`\`

Archivos subidos se guardan en `backend/uploads` del host.

## 🔍 Health Checks

### Backend Health Check

\`\`\`yaml
healthcheck:
  test: ['CMD', 'wget', '--spider', 'http://localhost:3001/api/health']
  interval: 30s
  timeout: 10s
  retries: 3
\`\`\`

Verifica que el backend responda antes de marcar como "healthy".

### Database Health Check

\`\`\`yaml
healthcheck:
  test: ['CMD-SHELL', 'pg_isready -U esports_admin']
  interval: 10s
\`\`\`

Verifica que PostgreSQL acepte conexiones.

### Ver Estado de Health Checks

\`\`\`bash
docker-compose ps
\`\`\`

Busca "(healthy)" en el estado.

## 🐛 Troubleshooting

### Error: "Cannot connect to database"

\`\`\`bash
# 1. Verificar que DB esté healthy
docker-compose ps db

# 2. Ver logs de DB
docker-compose logs db

# 3. Verificar variables de entorno del backend
docker-compose exec backend env | grep DB_

# 4. Probar conexión manual
docker-compose exec backend sh
nc -zv db 5432
\`\`\`

### Error: "Port already in use"

\`\`\`bash
# Ver qué está usando el puerto
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Cambiar puerto en docker-compose.yml
ports:
  - "3002:3000"  # Usar puerto 3002 en el host
\`\`\`

### Frontend no conecta con Backend

\`\`\`bash
# Verificar NEXT_PUBLIC_API_URL
docker-compose exec frontend env | grep NEXT_PUBLIC

# Debe ser: http://backend:3001 (interno)
# Desde navegador: http://localhost:3001 (externo)
\`\`\`

### Rebuild Completo (cuando todo falla)

\`\`\`bash
docker-compose down -v
docker system prune -a
docker-compose build --no-cache
docker-compose up -d
\`\`\`

## 📊 Monitoreo

### Ver Uso de Recursos

\`\`\`bash
docker stats
\`\`\`

### Ver Espacio de Docker

\`\`\`bash
docker system df
\`\`\`

### Limpiar Imágenes No Usadas

\`\`\`bash
docker image prune -a
\`\`\`

## 🔐 Producción

### Variables de Entorno en Producción

**NUNCA** commitear `.env` con datos reales.

1. Crear `.env.production`:
\`\`\`env
DB_PASSWORD=<password-fuerte>
JWT_SECRET=<mínimo-32-caracteres>
\`\`\`

2. Usar en docker-compose:
\`\`\`bash
docker-compose --env-file .env.production up -d
\`\`\`

### Logs en Producción

\`\`\`bash
# Configurar rotación de logs
docker-compose logs --tail=100 > app.log

# O usar logging driver
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
\`\`\`

## 📝 Checklist de Deployment

- [ ] Configurar `.env.production` con valores seguros
- [ ] Cambiar `JWT_SECRET` (mínimo 32 caracteres)
- [ ] Cambiar `DB_PASSWORD` a contraseña fuerte
- [ ] Configurar `FRONTEND_URL` con dominio real
- [ ] Revisar `docker-compose.yml` para producción
- [ ] Configurar reverse proxy (nginx/traefik)
- [ ] Habilitar HTTPS
- [ ] Configurar backups de PostgreSQL
- [ ] Monitorear logs y métricas
