#!/bin/bash

# Script de inicialización del backend
echo "====================================="
echo "  eSports Platform - Backend Setup  "
echo "====================================="
echo ""

# Verificar si existe .env
if [ ! -f .env ]; then
  echo "⚠️  No se encontró archivo .env"
  echo "📋 Copiando .env.example a .env..."
  cp .env.example .env
  echo "✅ Archivo .env creado"
  echo "⚠️  Por favor, configura las variables de entorno en .env antes de continuar"
  echo ""
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
  echo "✅ Dependencias instaladas correctamente"
else
  echo "❌ Error al instalar dependencias"
  exit 1
fi

echo ""

# Verificar si Docker está instalado
if command -v docker &> /dev/null; then
  echo "🐳 Docker detectado"
  echo "¿Deseas iniciar la base de datos con Docker? (s/n)"
  read -r response
  
  if [[ "$response" == "s" || "$response" == "S" ]]; then
    echo "🚀 Iniciando PostgreSQL con Docker..."
    docker-compose up -d postgres
    
    if [ $? -eq 0 ]; then
      echo "✅ PostgreSQL iniciado correctamente"
      echo "⏳ Esperando a que PostgreSQL esté listo..."
      sleep 5
    else
      echo "❌ Error al iniciar PostgreSQL"
      exit 1
    fi
  fi
else
  echo "⚠️  Docker no detectado. Asegúrate de tener PostgreSQL corriendo manualmente"
fi

echo ""
echo "====================================="
echo "  Setup completado exitosamente!    "
echo "====================================="
echo ""
echo "📝 Próximos pasos:"
echo ""
echo "1. Configura las variables en .env si es necesario"
echo "2. Inicia el servidor en modo desarrollo:"
echo "   npm run start:dev"
echo ""
echo "3. El backend estará disponible en:"
echo "   http://localhost:3001"
echo ""
echo "4. Endpoints de prueba:"
echo "   - GET  http://localhost:3001/api/juegos"
echo "   - POST http://localhost:3001/api/auth/register"
echo ""
echo "📚 Para más información, consulta:"
echo "   - README.md"
echo "   - SETUP.md"
echo "   - ARCHITECTURE.md"
echo ""
