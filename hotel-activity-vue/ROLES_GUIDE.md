# 🎭 Guía del Sistema de Roles - Hotel Activity Manager

## 📋 Resumen del Sistema

El sistema de roles permite diferente tipos de usuarios con funcionalidades y diseños específicos:

### 👥 **Huéspedes (Guests)**
- **Color de tema**: Azul (#2563eb)
- **Icono**: Corona 👑
- **Etiqueta**: "Huésped VIP"

### 👔 **Personal (Staff)**
- **Color de tema**: Morado (#7c3aed)
- **Icono**: Maletín 💼
- **Etiqueta**: "Personal del Hotel"

---

## 🔐 Proceso de Registro

### Para Huéspedes:
1. Seleccionar "Huésped" en el formulario de registro
2. Completar datos personales
3. Verificar email
4. ¡Listo para usar!

### Para Personal del Hotel:
1. Seleccionar "Personal" en el formulario de registro
2. **Importante**: Ingresar la **Clave Master**
3. Completar datos personales
4. Verificar email
5. Acceso a herramientas de gestión

### 🗝️ Clave Master para Staff
```
HOTEL_OCEAN_PARADISE_2024_STAFF
```
> **Nota**: Solo el personal de recepción debe tener acceso a esta clave

---

## 🎨 Diferencias Visuales

### Tema Azul (Huéspedes)
- Botones y elementos interactivos en azul
- Gradientes azules en header y cards
- Badge con icono de corona
- Información de habitación y check-out

### Tema Morado (Staff)
- Botones y elementos interactivos en morado
- Gradientes morados en header y cards
- Badge con icono de maletín
- Dashboard exclusivo con herramientas

---

## 🚀 Funcionalidades por Rol

### 🏖️ Huéspedes pueden:
- ✅ Ver y reservar actividades
- ✅ Gestionar sus reservas
- ✅ Ver su perfil con información de habitación
- ✅ Configurar notificaciones
- ✅ Ver estadísticas personales

### 👔 Staff puede hacer todo lo anterior PLUS:
- ✅ **Dashboard de gestión** con métricas del hotel
- ✅ **Estadísticas de ocupación** y satisfacción
- ✅ **Botones de acceso rápido** a:
  - 📊 Analytics del hotel
  - 👥 Gestión de huéspedes
  - 🏃‍♂️ Gestión de actividades
  - 📋 Reportes del sistema
- ✅ **Vista ampliada** del perfil sin restricciones de habitación

---

## 🔄 Flujo de Trabajo Recomendado

### Personal de Recepción:
1. **Crear cuentas de staff** usando la clave master
2. **Registrar huéspedes** con sus emails
3. **Proporcionar credenciales temporales** a huéspedes
4. Instruir a huéspedes para **cambiar contraseña** en primer login

### Huéspedes:
1. **Recibir credenciales** del personal de recepción
2. **Iniciar sesión** con credenciales temporales
3. **Actualizar perfil** y cambiar contraseña
4. **Explorar y reservar** actividades

### Staff del Hotel:
1. **Acceder con credenciales** de staff
2. **Monitorear dashboard** para métricas en tiempo real
3. **Gestionar reservas** y actividades
4. **Generar reportes** según necesidad

---

## 🛠️ Configuración Técnica

### Implementación de Roles:
```javascript
// Constantes de roles
USER_ROLES = {
  GUEST: 'guest',
  STAFF: 'staff'
}

// Validación de clave master
MASTER_KEY = 'HOTEL_OCEAN_PARADISE_2024_STAFF'
```

### Temas Dinámicos:
```css
/* CSS Variables que cambian según el rol */
:root {
  --color-primary: #2563eb; /* Azul para guests */
}

.theme-staff {
  --color-primary: #7c3aed; /* Morado para staff */
}
```

### Autenticación:
- Roles se almacenan en **Supabase user metadata**
- Validación de clave master en **lado cliente** (para demo)
- Persistencia automática de sesión y rol

---

## 🔍 Elementos Distintivos

### Header Dinámico:
- **Guests**: Icono de usuarios + fondo azul
- **Staff**: Icono de maletín + fondo morado

### Profile Badge:
- **Guests**: "Huésped VIP" con corona
- **Staff**: "Personal del Hotel" con maletín

### Dashboard Exclusivo:
- **Solo Staff**: Panel con métricas del hotel
- Estadísticas de ocupación, satisfacción y reservas
- Botones de acceso rápido a herramientas de gestión

---

## 📱 Experiencia de Usuario

### Responsive Design:
- **Mobile**: Bottom navigation adaptativa
- **Desktop**: Sidebar con colores según rol
- **Colores consistentes** en toda la aplicación

### Transiciones:
- **Cambio de tema** instantáneo al hacer login
- **Animaciones suaves** en elementos interactivos
- **Feedback visual** inmediato en acciones

---

## 🎯 Casos de Uso

### Escenario 1: Check-in de Huésped
1. Recepcionista crea cuenta con email del huésped
2. Proporciona contraseña temporal
3. Huésped accede y personaliza perfil
4. Comienza a explorar actividades

### Escenario 2: Personal Nuevo
1. Administrador proporciona clave master
2. Staff se registra con rol de personal
3. Accede a dashboard de gestión
4. Monitorea actividades y huéspedes

### Escenario 3: Gestión Diaria
1. Staff revisa métricas matutinas
2. Monitorea reservas del día
3. Gestiona actividades según demanda
4. Genera reportes de ocupación

---

## 🔒 Seguridad

### Medidas Implementadas:
- ✅ **Clave master** requerida para crear staff
- ✅ **Validación de roles** en componentes
- ✅ **Separación de funcionalidades** por rol
- ✅ **Sesiones persistentes** seguras con Supabase

### Recomendaciones:
- 🔄 Cambiar clave master periódicamente
- 👁️ Monitorear creación de cuentas staff
- 🔐 Usar contraseñas fuertes
- 📱 Habilitar 2FA en Supabase (próxima funcionalidad)

---

## 📞 Soporte

Para asistencia técnica o preguntas sobre el sistema de roles:

- **Email**: tech@oceanparadise.com
- **Slack**: #hotel-tech-support
- **Emergencias**: Contactar a administración

---

*Última actualización: Enero 2025*
*Versión del sistema: 1.0.0*
