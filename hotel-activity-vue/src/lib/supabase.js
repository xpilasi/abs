import { createClient } from '@supabase/supabase-js'
import { supabaseConfig } from '../../supabase-config.js'

// Configuración de Supabase
const supabaseUrl = supabaseConfig.url
const supabaseAnonKey = supabaseConfig.anonKey

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Función helper para obtener el usuario actual
export const getCurrentUser = () => {
  return supabase.auth.getUser()
}

// Función helper para obtener la sesión actual
export const getCurrentSession = () => {
  return supabase.auth.getSession()
}
