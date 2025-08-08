import { ref, reactive, computed } from 'vue'
import { supabase } from '@/lib/supabase.js'
import { USER_ROLES, MASTER_KEY, ROLE_THEMES, ROLE_LABELS } from '@/lib/constants.js'

// Estado global de autenticación
const user = ref(null)
const session = ref(null)
const loading = ref(true)
const authError = ref(null)

// Estado reactivo para el perfil del usuario
const userProfile = reactive({
  id: null,
  name: '',
  email: '',
  avatar: '',
  room: '',
  checkIn: '',
  checkOut: '',
  role: USER_ROLES.GUEST, // Por defecto es guest
  theme: ROLE_THEMES[USER_ROLES.GUEST] // Tema por defecto
})

/**
 * Composable para manejo de autenticación con Supabase
 * @returns {Object} Funciones y estado de autenticación
 */
export function useAuth() {
  // Computed properties
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = computed(() => loading.value)
  const isStaff = computed(() => userProfile.role === USER_ROLES.STAFF)
  const isGuest = computed(() => userProfile.role === USER_ROLES.GUEST)
  const currentTheme = computed(() => userProfile.theme)
  const roleLabel = computed(() => ROLE_LABELS[userProfile.role] || ROLE_LABELS[USER_ROLES.GUEST])
  
  /**
   * Validar clave master para staff
   * @param {string} masterKey 
   * @returns {boolean}
   */
  const validateMasterKey = (masterKey) => {
    return masterKey === MASTER_KEY
  }

  /**
   * Actualizar tema del usuario según su rol
   * @param {string} role 
   */
  const updateUserTheme = (role) => {
    userProfile.theme = ROLE_THEMES[role] || ROLE_THEMES[USER_ROLES.GUEST]
    
    // Aplicar CSS variables dinámicas al documento
    const root = document.documentElement
    const theme = userProfile.theme
    
    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-primary-hover', theme.primaryHover)
    root.style.setProperty('--color-primary-light', theme.primaryLight)
  }
  
  /**
   * Inicializar autenticación y escuchar cambios
   */
  const initializeAuth = async () => {
    try {
      loading.value = true
      
      // Obtener sesión actual
      const { data: { session: currentSession }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error)
        authError.value = error.message
        return
      }

      session.value = currentSession
      user.value = currentSession?.user || null

      // Si hay usuario, cargar perfil
      if (user.value) {
        await loadUserProfile()
      }

      // Escuchar cambios de autenticación
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        console.log('Auth state changed:', event)
        
        session.value = newSession
        user.value = newSession?.user || null

        if (event === 'SIGNED_IN' && user.value) {
          await loadUserProfile()
        } else if (event === 'SIGNED_OUT') {
          clearUserProfile()
        }
      })

    } catch (error) {
      console.error('Error initializing auth:', error)
      authError.value = error.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Cargar perfil del usuario desde Supabase
   */
  const loadUserProfile = async () => {
    if (!user.value) return

    try {
      // Por ahora usamos datos del usuario de Supabase
      // En el futuro se puede extender con una tabla de perfiles
      userProfile.id = user.value.id
      userProfile.name = user.value.user_metadata?.full_name || 'Guest User'
      userProfile.email = user.value.email
      userProfile.avatar = user.value.user_metadata?.avatar_url || ''
      
      // Obtener rol del usuario desde metadata
      const userRole = user.value.user_metadata?.role || USER_ROLES.GUEST
      userProfile.role = userRole
      
      // Actualizar tema según el rol
      updateUserTheme(userRole)
      
      // Datos específicos según el rol
      if (userRole === USER_ROLES.STAFF) {
        userProfile.room = 'Staff Area'
        userProfile.checkIn = 'N/A'
        userProfile.checkOut = 'N/A'
      } else {
        // Datos mock del hotel para huéspedes
        userProfile.room = '305'
        userProfile.checkIn = '2025-08-08'
        userProfile.checkOut = '2025-08-12'
      }

    } catch (error) {
      console.error('Error loading user profile:', error)
      authError.value = error.message
    }
  }

  /**
   * Limpiar datos del perfil
   */
  const clearUserProfile = () => {
    userProfile.id = null
    userProfile.name = ''
    userProfile.email = ''
    userProfile.avatar = ''
    userProfile.room = ''
    userProfile.checkIn = ''
    userProfile.checkOut = ''
    userProfile.role = USER_ROLES.GUEST
    userProfile.theme = ROLE_THEMES[USER_ROLES.GUEST]
    
    // Restaurar tema por defecto
    updateUserTheme(USER_ROLES.GUEST)
  }

  /**
   * Registrar nuevo usuario
   * @param {string} email 
   * @param {string} password 
   * @param {string} fullName 
   * @param {string} role 
   * @param {string} masterKey - Requerido solo para staff
   */
  const signUp = async (email, password, fullName, role = USER_ROLES.GUEST, masterKey = '') => {
    try {
      loading.value = true
      authError.value = null

      // Validar clave master para staff
      if (role === USER_ROLES.STAFF) {
        if (!masterKey || !validateMasterKey(masterKey)) {
          authError.value = 'Clave master inválida para crear cuenta de staff'
          return { success: false, error: 'Clave master inválida para crear cuenta de staff' }
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      })

      if (error) {
        authError.value = error.message
        return { success: false, error: error.message }
      }

      const roleText = role === USER_ROLES.STAFF ? 'personal' : 'huésped'
      return { 
        success: true, 
        data,
        message: `Registro exitoso como ${roleText}! Por favor revisa tu email para verificación.` 
      }

    } catch (error) {
      console.error('Error during sign up:', error)
      authError.value = error.message
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Iniciar sesión
   * @param {string} email 
   * @param {string} password 
   */
  const signIn = async (email, password) => {
    try {
      loading.value = true
      authError.value = null

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        authError.value = error.message
        return { success: false, error: error.message }
      }

      return { success: true, data }

    } catch (error) {
      console.error('Error during sign in:', error)
      authError.value = error.message
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Cerrar sesión
   */
  const signOut = async () => {
    try {
      loading.value = true
      authError.value = null

      const { error } = await supabase.auth.signOut()

      if (error) {
        authError.value = error.message
        return { success: false, error: error.message }
      }

      return { success: true }

    } catch (error) {
      console.error('Error during sign out:', error)
      authError.value = error.message
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Restablecer contraseña
   * @param {string} email 
   */
  const resetPassword = async (email) => {
    try {
      loading.value = true
      authError.value = null

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        authError.value = error.message
        return { success: false, error: error.message }
      }

      return { 
        success: true, 
        message: 'Password reset email sent! Please check your inbox.' 
      }

    } catch (error) {
      console.error('Error during password reset:', error)
      authError.value = error.message
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Actualizar perfil del usuario
   * @param {Object} updates 
   */
  const updateProfile = async (updates) => {
    try {
      loading.value = true
      authError.value = null

      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })

      if (error) {
        authError.value = error.message
        return { success: false, error: error.message }
      }

      // Recargar perfil
      await loadUserProfile()

      return { success: true, data }

    } catch (error) {
      console.error('Error updating profile:', error)
      authError.value = error.message
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Limpiar errores de autenticación
   */
  const clearAuthError = () => {
    authError.value = null
  }

  return {
    // Estado
    user,
    session,
    userProfile,
    loading,
    authError,
    isAuthenticated,
    isLoading,

    // Estado de roles
    isStaff,
    isGuest,
    currentTheme,
    roleLabel,

    // Métodos
    initializeAuth,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    clearAuthError,
    loadUserProfile,
    
    // Métodos de roles
    validateMasterKey,
    updateUserTheme,

    // Constantes
    USER_ROLES,
    ROLE_THEMES,
    ROLE_LABELS
  }
}
