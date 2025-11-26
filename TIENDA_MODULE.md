# 🛒 Módulo de Tienda - Sistema eSports

## 📋 Descripción General

El módulo de tienda es el sistema de monetización de la plataforma, donde los usuarios pueden comprar créditos, membresías premium y servicios adicionales usando saldo (dinero real simulado).

---

## 🏗️ Arquitectura del Módulo

### Entidades Principales

#### 1. **TiendaItem** (Productos de la Tienda)
Representa todos los productos disponibles para compra.

**Campos:**
- `id`: UUID único del item
- `tipo`: Relación con `CatalogoTipoItem` (creditos, membresia, servicio)
- `nombre`: Nombre del producto
- `descripcion`: Descripción del producto (opcional)
- `precio`: Precio en dólares (formato decimal 12,2)
- `creditosOtorgados`: Créditos que otorga (solo para tipo 'creditos')
- `metadata`: Datos adicionales en formato JSON (flexible)

**Tipos de Items:**
- **Créditos**: Paquetes de créditos para torneos
- **Membresía**: Planes premium mensuales/anuales
- **Servicio**: Servicios adicionales (cambio de nickname, reset de stats)

---

#### 2. **MembresiaTipo** (Planes de Membresía)
Define los diferentes planes de membresía disponibles.

**Campos:**
- `id`: UUID único
- `nombre`: Nombre del plan (ej: "Premium 1 Mes")
- `precio`: Precio del plan
- `duracionDias`: Duración en días (30, 90, 180, 365)
- `beneficios`: Descripción de beneficios (texto)

**Planes Disponibles:**
1. Gratuita (predeterminada)
2. Premium 1 Mes
3. Premium 3 Meses (28% descuento)
4. Premium 6 Meses (30% descuento)
5. Premium 12 Meses (30% descuento)

---

#### 3. **UsuarioMembresia** (Membresías Activas)
Registra las membresías compradas por usuarios.

**Campos:**
- `id`: UUID único
- `usuario`: Relación con Usuario
- `membresiaTipo`: Tipo de membresía comprada
- `fechaInicio`: Fecha de activación
- `fechaFin`: Fecha de expiración
- `activa`: Estado de la membresía (boolean)

**Lógica:**
- Se crea al comprar una membresía
- Se desactiva automáticamente al expirar
- Un usuario puede tener múltiples registros (histórico)
- Solo una puede estar activa a la vez

---

#### 4. **Transaccion** (Historial de Transacciones)
Registra todas las transacciones económicas del sistema.

**Campos:**
- `id`: UUID único
- `usuario`: Usuario que realiza la transacción
- `tipo`: Tipo de transacción (credito/debito)
- `monto`: Monto de la transacción
- `descripcion`: Detalle de la transacción
- `origen`: Origen de la transacción (compra, premio, reembolso, etc.)
- `creadoEn`: Timestamp de creación

**Orígenes de Transacción:**
- `compra`: Compra en tienda
- `premio`: Premio de torneo
- `reembolso`: Devolución de dinero
- `regalo`: Regalo de otro usuario
- `logro`: Recompensa por logro
- `torneo`: Ingreso/egreso de torneo

---

### Catálogos de Soporte

#### **CatalogoTipoItem**
Tipos de productos disponibles:
- `creditos`: Paquetes de créditos
- `membresia`: Planes premium
- `servicio`: Servicios adicionales

#### **CatalogoTransaccionTipo**
Tipos de movimiento:
- `credito`: Ingreso de dinero/créditos
- `debito`: Salida de dinero/créditos

#### **CatalogoOrigenTransaccion**
Origen del movimiento:
- `compra`, `premio`, `reembolso`, `regalo`, `logro`, `torneo`

---

## 💰 Sistema Económico

### Monedas del Sistema

1. **Saldo (Dólares $)**
   - Dinero real simulado
   - Se recarga con dinero real
   - Se usa para comprar en la tienda
   - Se puede retirar (mínimo de retiro aplica)
   - Almacenado en: `Usuario.saldo`

2. **Créditos**
   - Moneda interna del sistema
   - Se compran con saldo
   - Se usan para entrar a torneos
   - NO se pueden retirar
   - Almacenado en: `Usuario.creditos`

### Paquetes de Créditos (según context.txt)

| Créditos | Precio | Precio por Crédito |
|----------|--------|-------------------|
| 1        | $1.00  | $1.00            |
| 3        | $2.25  | $0.75            |
| 5        | $3.75  | $0.75            |
| 7        | $5.00  | $0.71            |
| 10       | $7.50  | $0.75            |
| 15       | $10.00 | $0.67            |

### Planes de Membresía (según context.txt)

| Plan            | Precio  | Ahorro | Duración |
|-----------------|---------|--------|----------|
| Gratuita        | $0.00   | -      | Siempre  |
| Premium 1 Mes   | $5.99   | -      | 30 días  |
| Premium 3 Meses | $12.99  | 28%    | 90 días  |
| Premium 6 Meses | $24.99  | 30%    | 180 días |
| Premium 12 Meses| $49.99  | 30%    | 365 días |

### Beneficios por Membresía

**Gratuita (Default):**
- ✅ Acceso a competiciones gratuitas
- ✅ Desafíos con apuestas
- ✅ Desafíos de XP
- ✅ Premios con pago instantáneo

**Premium (Todas las anteriores +):**
- ✅ Apuestas sin comisiones
- ✅ Entrada gratuita a torneos ELITE
- ✅ Avatares premium
- ✅ Personalización de página de equipo
- ✅ Personalización de página de perfil

### Servicios Adicionales (según context.txt)

| Servicio                | Precio | Descripción |
|------------------------|--------|-------------|
| Cambio de nickname     | $3.99  | Cambiar nombre de usuario |
| Récord de juego reset  | $5.99  | Reiniciar historial de juegos |
| Estadísticas reset     | $3.99  | Reiniciar estadísticas |

---

## 🔄 Flujos de Transacción

### 1. Compra de Créditos
```
1. Usuario selecciona paquete de créditos
2. Sistema verifica saldo disponible
3. Si saldo suficiente:
   - Debita el saldo (Transaccion tipo: debito, origen: compra)
   - Acredita los créditos (Usuario.creditos ++)
4. Retorna confirmación
```

### 2. Compra de Membresía
```
1. Usuario selecciona plan de membresía
2. Sistema verifica:
   - Saldo disponible
   - No tiene membresía activa
3. Si todo OK:
   - Debita el saldo (Transaccion tipo: debito, origen: compra)
   - Crea UsuarioMembresia:
     * fechaInicio: hoy
     * fechaFin: hoy + duracionDias
     * activa: true
4. Retorna confirmación
```

### 3. Compra de Servicio
```
1. Usuario selecciona servicio
2. Sistema verifica saldo
3. Si saldo suficiente:
   - Debita el saldo (Transaccion tipo: debito, origen: compra)
   - Ejecuta el servicio (cambio nickname, reset stats, etc.)
4. Retorna confirmación
```

### 4. Recarga de Saldo
```
1. Usuario ingresa monto a recargar
2. Sistema procesa pago (integración futura)
3. Si pago exitoso:
   - Acredita saldo (Transaccion tipo: credito, origen: compra)
4. Retorna confirmación
```

### 5. Retiro de Saldo
```
1. Usuario solicita retiro
2. Sistema valida:
   - Saldo mínimo para retiro
   - Información de PayPal configurada
3. Si todo OK:
   - Debita saldo (Transaccion tipo: debito, origen: retiro)
   - Procesa pago a PayPal (integración futura)
4. Retorna confirmación
```

---

## 📊 Seeds Iniciales Necesarios

### CatalogoTipoItem
```typescript
- creditos
- membresia
- servicio
```

### MembresiaTipo
```typescript
- Membresía Gratuita (precio: 0, duracion: 0)
- Membresía Premium 1 Mes (precio: 5.99, duracion: 30)
- Membresía Premium 3 Meses (precio: 12.99, duracion: 90)
- Membresía Premium 6 Meses (precio: 24.99, duracion: 180)
- Membresía Premium 12 Meses (precio: 49.99, duracion: 365)
```

### TiendaItem - Créditos
```typescript
- 1 Crédito ($1.00)
- 3 Créditos ($2.25)
- 5 Créditos ($3.75)
- 7 Créditos ($5.00)
- 10 Créditos ($7.50)
- 15 Créditos ($10.00)
```

### TiendaItem - Membresías
```typescript
- Membresía Premium 1 Mes ($5.99)
- Membresía Premium 3 Meses ($12.99)
- Membresía Premium 6 Meses ($24.99)
- Membresía Premium 12 Meses ($49.99)
```

### TiendaItem - Servicios
```typescript
- Cambio de Nickname ($3.99)
- Reiniciar Récord de Juego ($5.99)
- Reiniciar Estadísticas ($3.99)
```

---

## 🎨 Páginas del Frontend

### 1. **Tienda Principal** (`/tienda`)
Muestra todos los productos disponibles en 3 secciones:

**Diseño:**
- **Header:** Saldo actual y créditos del usuario
- **Tabs:** Créditos | Membresías | Servicios
- **Cards de productos:** Con precio, descripción y botón de compra
- **Modal de confirmación:** Antes de cada compra

**Componentes:**
- `TiendaHeader`: Muestra saldo y créditos
- `ProductCard`: Card individual de producto
- `PurchaseModal`: Modal de confirmación de compra
- `TabsNavigation`: Navegación entre secciones

---

### 2. **Sección Créditos** (`/tienda?tab=creditos`)

**Elementos:**
- Grid de cards con paquetes de créditos
- Cada card muestra:
  - Cantidad de créditos
  - Precio
  - Ahorro (si aplica)
  - Badge "Mejor valor" en los más convenientes
  - Botón "Comprar"

**Lógica:**
- Validar saldo suficiente
- Mostrar modal de confirmación
- Ejecutar compra
- Actualizar saldo y créditos

---

### 3. **Sección Membresías** (`/tienda?tab=membresias`)

**Elementos:**
- Cards de planes de membresía
- Plan gratuito destacado (sin precio)
- Planes premium con:
  - Nombre del plan
  - Precio original y con descuento
  - Badge de ahorro
  - Lista de beneficios
  - Botón "Activar" o "Mejorar"
- Indicador de membresía actual

**Lógica:**
- Verificar si tiene membresía activa
- Deshabilitar compra si ya es premium activo
- Mostrar fecha de expiración de membresía actual
- Ejecutar compra y activar membresía

---

### 4. **Sección Servicios** (`/tienda?tab=servicios`)

**Elementos:**
- Cards de servicios disponibles
- Cada card muestra:
  - Icono del servicio
  - Nombre del servicio
  - Descripción
  - Precio
  - Botón "Comprar"

**Servicios:**
1. **Cambio de Nickname**
   - Input para nuevo nickname
   - Validación de disponibilidad
   
2. **Reset de Récord**
   - Warning de acción irreversible
   - Confirmación doble
   
3. **Reset de Estadísticas**
   - Warning de acción irreversible
   - Confirmación doble

---

### 5. **Modal de Recarga de Saldo** (Componente global)

**Elementos:**
- Input de monto a recargar
- Métodos de pago (futuro)
- Botón de confirmación
- Resumen de transacción

**Nota:** La integración de pago real será futura, por ahora solo mostrar UI.

---

## 🔐 Validaciones y Reglas de Negocio

### Compras
- ✅ Usuario debe tener saldo suficiente
- ✅ No se puede comprar con saldo negativo
- ✅ Las compras se registran en Transaccion
- ✅ Los créditos no se pueden convertir a saldo

### Membresías
- ✅ Solo una membresía puede estar activa
- ✅ Al expirar, vuelve a plan gratuito
- ✅ No se puede comprar si ya tiene premium activo
- ✅ Se puede renovar antes de expirar (extiende fecha)

### Servicios
- ✅ Cambio de nickname: validar unicidad
- ✅ Resets: confirmación doble
- ✅ Una vez ejecutados, no hay devolución

### Transacciones
- ✅ Todas las compras generan transacción tipo "debito"
- ✅ Todas las recargas generan transacción tipo "credito"
- ✅ Incluir descripción detallada
- ✅ Registrar origen correcto

---

## 📡 Endpoints de API Necesarios

### Tienda
```
GET    /tienda-item              - Listar todos los items (público)
GET    /tienda-item/:id          - Obtener item específico (público)
POST   /tienda-item              - Crear item (admin)
PATCH  /tienda-item/:id          - Actualizar item (admin)
DELETE /tienda-item/:id          - Eliminar item (admin)
```

### Membresías
```
GET    /membresia-tipo           - Listar planes (público)
GET    /membresia-tipo/:id       - Obtener plan específico (público)
POST   /membresia-tipo           - Crear plan (admin)
PATCH  /membresia-tipo/:id       - Actualizar plan (admin)
DELETE /membresia-tipo/:id       - Eliminar plan (admin)
```

### Usuario Membresías
```
GET    /usuario-membresia/mis-membresias        - Membresías del usuario actual
POST   /usuario-membresia/comprar               - Comprar membresía
GET    /usuario-membresia/activa                - Obtener membresía activa
```

### Transacciones
```
GET    /transaccion/mis-transacciones           - Historial del usuario
POST   /transaccion/comprar-creditos            - Comprar paquete de créditos
POST   /transaccion/comprar-servicio            - Comprar servicio
POST   /transaccion/recargar-saldo              - Recargar saldo (futuro)
```

### Usuario (endpoints adicionales)
```
GET    /usuario/mi-saldo                        - Obtener saldo y créditos
PATCH  /usuario/cambiar-nickname                - Cambiar nickname (servicio)
POST   /usuario/reset-stats                     - Reset estadísticas (servicio)
```

---

## 🎯 Próximos Pasos para Desarrollo

1. ✅ Revisar y entender este documento
2. ⬜ Actualizar seeder con datos de tienda
3. ⬜ Crear endpoints de compra en backend
4. ⬜ Desarrollar página principal de tienda en frontend
5. ⬜ Implementar modal de confirmación de compras
6. ⬜ Crear sistema de validación de membresías
7. ⬜ Implementar servicios especiales (nickname, resets)
8. ⬜ Agregar historial de transacciones en dashboard usuario
9. ⬜ Crear sistema de notificaciones de compras
10. ⬜ (Futuro) Integrar pasarela de pago real

---

## 📝 Notas Adicionales

- Los avatares premium solo se desbloquean con membresía activa
- El sistema debe validar automáticamente la expiración de membresías
- Las transacciones son inmutables (no se pueden editar/eliminar)
- El saldo se almacena como string para precisión decimal
- Los créditos son números enteros (no hay fracciones)
- El metadata en TiendaItem permite flexibilidad para futuros productos

---

## 🔗 Relaciones entre Módulos

```
Usuario
  ├── saldo (campo)
  ├── creditos (campo)
  ├── membresias[] (UsuarioMembresia)
  └── transacciones[] (Transaccion)

TiendaItem
  └── tipo (CatalogoTipoItem)

UsuarioMembresia
  ├── usuario (Usuario)
  └── membresiaTipo (MembresiaTipo)

Transaccion
  ├── usuario (Usuario)
  ├── tipo (CatalogoTransaccionTipo)
  └── origen (CatalogoOrigenTransaccion)
```

---

**Documento creado:** 25 de noviembre de 2025  
**Versión:** 1.0  
**Estado:** Listo para implementación
