# Script de inicialización del backend para Windows
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  eSports Platform - Backend Setup  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si existe .env
if (-Not (Test-Path .env)) {
    Write-Host "⚠️  No se encontró archivo .env" -ForegroundColor Yellow
    Write-Host "📋 Copiando .env.example a .env..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ Archivo .env creado" -ForegroundColor Green
    Write-Host "⚠️  Por favor, configura las variables de entorno en .env antes de continuar" -ForegroundColor Yellow
    Write-Host ""
}

# Instalar dependencias
Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Verificar si Docker está instalado
$dockerInstalled = $null -ne (Get-Command docker -ErrorAction SilentlyContinue)

if ($dockerInstalled) {
    Write-Host "🐳 Docker detectado" -ForegroundColor Cyan
    $response = Read-Host "¿Deseas iniciar la base de datos con Docker? (s/n)"
    
    if ($response -eq "s" -or $response -eq "S") {
        Write-Host "🚀 Iniciando PostgreSQL con Docker..." -ForegroundColor Yellow
        docker-compose up -d postgres
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ PostgreSQL iniciado correctamente" -ForegroundColor Green
            Write-Host "⏳ Esperando a que PostgreSQL esté listo..." -ForegroundColor Yellow
            Start-Sleep -Seconds 5
        } else {
            Write-Host "❌ Error al iniciar PostgreSQL" -ForegroundColor Red
            exit 1
        }
    }
} else {
    Write-Host "⚠️  Docker no detectado. Asegúrate de tener PostgreSQL corriendo manualmente" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "  Setup completado exitosamente!    " -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Configura las variables en .env si es necesario"
Write-Host "2. Inicia el servidor en modo desarrollo:"
Write-Host "   npm run start:dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. El backend estará disponible en:"
Write-Host "   http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Endpoints de prueba:"
Write-Host "   - GET  http://localhost:3001/api/juegos"
Write-Host "   - POST http://localhost:3001/api/auth/register"
Write-Host ""
Write-Host "📚 Para más información, consulta:"
Write-Host "   - README.md"
Write-Host "   - SETUP.md"
Write-Host "   - ARCHITECTURE.md"
Write-Host ""
