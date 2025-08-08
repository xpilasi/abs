// INSTRUCCIONES DE CONFIGURACIÓN DE SUPABASE
// 
// 1. Copia este archivo y renómbralo a: supabase-config.js
// 2. Reemplaza los valores de ejemplo con tus credenciales reales de Supabase
// 3. Ve a https://supabase.com/dashboard -> Tu Proyecto -> Settings -> API
// 4. Copia la URL del proyecto y la Anon Key

export const supabaseConfig = {
  // Reemplaza con tu URL de Supabase (ej: https://tu-proyecto.supabase.co)
  url: 'TU_SUPABASE_URL',
  
  // Reemplaza con tu Anon Public Key (empieza con eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
  anonKey: 'TU_SUPABASE_ANON_KEY'
}

// IMPORTANTE: 
// - NO subas el archivo supabase-config.js a control de versiones
// - Agrega supabase-config.js a tu .gitignore
// - Solo usa la Anon Public Key, NUNCA la Service Role Key
