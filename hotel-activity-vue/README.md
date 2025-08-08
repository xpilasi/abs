# Hotel Activity Manager - Vue 3

Una aplicación completa de gestión de actividades hoteleras desarrollada con Vue 3, Options API, JavaScript y Tailwind CSS 4.

## 🚀 Características

- **Vue 3 con Options API**: Arquitectura moderna y reactiva
- **JavaScript puro**: Sin TypeScript para mayor simplicidad  
- **Tailwind CSS 4**: Sistema de diseño moderno y responsive
- **Responsive Design**: Optimizado para dispositivos móviles y desktop
- **Navegación adaptativa**: Sidebar en desktop, bottom navigation en móvil
- **Gestión de estado local**: Sin librerías externas adicionales
- **Componentes reutilizables**: UI components modulares
- **🔐 Autenticación con Supabase**: Sistema completo de login/registro
- **Gestión de usuarios**: Perfiles autenticados y protección de rutas
- **Estados de sesión**: Persistencia automática de sesiones

## 📱 Pantallas Principales

### 🏠 Home Screen
- Panel de bienvenida personalizado
- Acciones rápidas (Reservar actividad, Ver reservas)
- Actividades destacadas
- Actividad popular de la semana

### 🎯 Activities Screen
- Catálogo completo de actividades
- Búsqueda y filtros por categoría
- Tarjetas detalladas con información completa
- Botones de reserva directa

### 📋 Activity Detail Screen
- Vista detallada de cada actividad
- Selección de fecha y horario
- Información completa (instructor, amenidades, ubicación)
- Sistema de reservas integrado

### 📅 Bookings Screen
- Gestión de reservas (próximas e historial)
- Estadísticas de actividades
- Estados de reserva en tiempo real
- Cancelación de reservas

### 👤 Profile Screen
- Información del huésped
- Estadísticas de actividades
- Configuración de notificaciones
- Actividades favoritas
- Contacto con conserjería

### 🔐 Authentication Screen
- Login con email y contraseña
- Registro de nuevos usuarios con roles
- Recuperación de contraseña
- Verificación por email
- Persistencia de sesión
- Sistema de logout múltiple

## 🛠️ Tecnologías Utilizadas

- **Vue 3** - Framework JavaScript progresivo
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS 4** - Framework CSS utility-first
- **Supabase** - Backend-as-a-Service para autenticación
- **Lucide Vue Next** - Iconos modernos
- **Clsx** - Utilidad para clases condicionales

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd hotel-activity-vue
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Supabase** (Ver `SUPABASE_SETUP.md` para detalles)
   ```bash
   cp supabase-config.example.js supabase-config.js
   # Editar supabase-config.js con tus credenciales
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── assets/
│   └── styles.css          # Estilos globales y Tailwind
├── components/
│   ├── auth/               # Componentes de autenticación
│   │   ├── LoginForm.vue
│   │   ├── RegisterForm.vue
│   │   └── ForgotPasswordForm.vue
│   ├── figma/
│   │   └── ImageWithFallback.vue
│   ├── navigation/
│   │   ├── DesktopSidebar.vue
│   │   └── MobileBottomNav.vue
│   ├── screens/
│   │   ├── AuthScreen.vue
│   │   ├── HomeScreen.vue
│   │   ├── ActivitiesScreen.vue
│   │   ├── ActivityDetailScreen.vue
│   │   ├── BookingsScreen.vue
│   │   └── ProfileScreen.vue
│   └── ui/
│       ├── Avatar.vue
│       ├── Badge.vue
│       ├── Button.vue
│       ├── Card.vue
│       ├── Input.vue
│       ├── Switch.vue
│       └── Tabs.vue
├── composables/
│   ├── useMobile.js        # Composable para detección móvil
│   └── useAuth.js          # Composable para autenticación
├── lib/
│   ├── mock-data.js        # Datos de prueba
│   ├── types.js            # Tipos JSDoc
│   ├── utils.js            # Utilidades
│   └── supabase.js         # Cliente de Supabase
├── App.vue                 # Componente principal
└── main.js                 # Punto de entrada
```

## 🎨 Características de Diseño

### Sistema de Colores
- **Primario**: Azul (#2563eb)
- **Secundario**: Gris claro (#f1f5f9)
- **Acentos**: Verde para confirmaciones, Naranja para destacados
- **Neutros**: Escalas de grises para texto y fondos

### Responsive Design
- **Desktop**: Sidebar fijo con navegación lateral
- **Móvil**: Bottom navigation con pantalla completa
- **Breakpoint**: 768px (md en Tailwind)

### Componentes UI
- Botones con variantes (default, outline, ghost, destructive)
- Cards con esquinas redondeadas y sombras suaves
- Inputs con estados de focus y validación
- Badges para categorías y estados
- Avatares con fallback automático
- Switches personalizados
- Tabs con navegación fluida

## 🔐 Sistema de Autenticación

### Configuración con Supabase
- **Cliente configurado** con auto-refresh de tokens
- **Persistencia de sesión** automática
- **Protección de rutas** completa
- **Gestión de errores** integrada

### Flujo de Autenticación
1. **Pantalla inicial**: Verificación de sesión
2. **Login/Registro**: Formularios con validación
3. **Verificación email**: Confirmación automática
4. **Acceso completo**: Todas las funcionalidades desbloqueadas
5. **Logout**: Limpieza segura de sesión

### Funcionalidades de Auth
- ✅ Registro de usuarios con validación
- ✅ Login con email/contraseña
- ✅ Recuperación de contraseña
- ✅ Verificación por email
- ✅ Persistencia de sesión
- ✅ Auto-refresh de tokens
- ✅ Protección de rutas
- ✅ Gestión de perfil de usuario

## 📊 Gestión de Datos

### Mock Data
- **Usuarios**: Información completa del huésped
- **Actividades**: Catálogo con 8 actividades variadas
- **Reservas**: Sistema de reservas con estados
- **Time Slots**: Generación dinámica de horarios

### Categorías de Actividades
- **Wellness**: Yoga, Spa, Masajes
- **Sports**: Tenis, Pádel
- **Water**: Piscina, Surf
- **Experiences**: Excursiones, Tours

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 🚀 Funcionalidades Principales

### Navegación Inteligente
- Detección automática de dispositivo móvil
- Transiciones suaves entre pantallas
- Estado persistente de navegación

### Sistema de Reservas
- Selección de fecha y horario
- Verificación de disponibilidad
- Confirmación modal
- Gestión de estados

### Búsqueda y Filtros
- Búsqueda en tiempo real
- Filtros por categoría
- Contador de resultados
- Reset de filtros

### Responsive Components
- Grids adaptativos
- Imágenes con fallback
- Texto responsivo
- Espaciado dinámico

## 🎯 Próximas Funcionalidades

- [x] ✅ Autenticación de usuarios (Completado)
- [ ] Integración con API real
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] PWA capabilities
- [ ] Animaciones avanzadas
- [ ] Calendario de actividades
- [ ] Sistema de calificaciones

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Componentes UI inspirados en [shadcn/ui](https://ui.shadcn.com/)
- Imágenes de [Unsplash](https://unsplash.com)
- Iconos de [Lucide](https://lucide.dev)

---

**Desarrollado con ❤️ usando Vue 3 y Tailwind CSS**