// Constantes del sistema de Hotel Activity Management

// Tipos de usuarios
export const USER_ROLES = {
  GUEST: 'guest',
  STAFF: 'staff'
}

// Clave master para crear cuentas de staff
// NOTA: En producción, esta debería estar en variables de entorno del servidor
export const MASTER_KEY = 'HOTEL_OCEAN_PARADISE_2024_STAFF'

// Configuración de temas por rol
export const ROLE_THEMES = {
  [USER_ROLES.GUEST]: {
    name: 'guest',
    primary: '#2563eb',        // Azul
    primaryHover: '#1d4ed8',
    primaryLight: '#dbeafe',
    gradient: 'from-blue-600 to-blue-700',
    gradientBg: 'from-blue-50 via-white to-blue-50',
    textPrimary: 'text-blue-600',
    bgPrimary: 'bg-blue-600',
    bgPrimaryHover: 'hover:bg-blue-700',
    borderPrimary: 'border-blue-200',
    ringPrimary: 'ring-blue-500'
  },
  [USER_ROLES.STAFF]: {
    name: 'staff',
    primary: '#7c3aed',        // Morado
    primaryHover: '#6d28d9',
    primaryLight: '#ede9fe',
    gradient: 'from-purple-600 to-purple-700',
    gradientBg: 'from-purple-50 via-white to-purple-50',
    textPrimary: 'text-purple-600',
    bgPrimary: 'bg-purple-600',
    bgPrimaryHover: 'hover:bg-purple-700',
    borderPrimary: 'border-purple-200',
    ringPrimary: 'ring-purple-500'
  }
}

// Etiquetas de roles para UI
export const ROLE_LABELS = {
  [USER_ROLES.GUEST]: {
    title: 'Huésped',
    subtitle: 'Cliente del hotel',
    icon: '🏖️',
    description: 'Acceso a reservas y actividades'
  },
  [USER_ROLES.STAFF]: {
    title: 'Personal',
    subtitle: 'Staff del hotel',
    icon: '👔',
    description: 'Gestión completa del sistema'
  }
}

// Funcionalidades por rol
export const ROLE_PERMISSIONS = {
  [USER_ROLES.GUEST]: [
    'view_activities',
    'make_bookings',
    'view_own_bookings',
    'update_profile'
  ],
  [USER_ROLES.STAFF]: [
    'view_activities',
    'make_bookings',
    'view_all_bookings',
    'manage_activities',
    'view_analytics',
    'manage_users',
    'update_profile',
    'staff_dashboard'
  ]
}
