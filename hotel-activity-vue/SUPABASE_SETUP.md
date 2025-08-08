# 🔐 Configuración de Autenticación con Supabase

Esta guía te ayudará a configurar la autenticación con Supabase en tu aplicación Vue.

## 📋 Requisitos Previos

1. **Cuenta de Supabase**: Crea una cuenta gratuita en [supabase.com](https://supabase.com)
2. **Proyecto Supabase**: Crea un nuevo proyecto en tu dashboard

## 🚀 Pasos de Configuración

### 1. Obtener Credenciales de Supabase

1. Ve a tu **Dashboard de Supabase**
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia estos valores:
   - **Project URL** (ej: `https://tu-proyecto.supabase.co`)
   - **Anon public key** (empieza con `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2. Configurar Credenciales en la Aplicación

1. **Copia el archivo de ejemplo:**
   ```bash
   cp supabase-config.example.js supabase-config.js
   ```

2. **Edita el archivo `supabase-config.js`:**
   ```javascript
   export const supabaseConfig = {
     url: 'https://tu-proyecto.supabase.co',
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   }
   ```

3. **Agrega al .gitignore (si no está ya):**
   ```bash
   echo "supabase-config.js" >> .gitignore
   ```

### 3. Configurar Autenticación en Supabase

En tu Dashboard de Supabase:

1. **Ve a Authentication → Settings**
2. **Site URL**: Agrega `http://localhost:5173` para desarrollo
3. **Redirect URLs**: Agrega `http://localhost:5173/**`

### 4. Configuración Opcional: Tablas de Usuario

Por defecto, la app usa los datos básicos de Supabase Auth. Si quieres información adicional:

1. **Crea una tabla `profiles`:**
   ```sql
   create table profiles (
     id uuid references auth.users on delete cascade,
     full_name text,
     username text,
     room_number text,
     check_in_date date,
     check_out_date date,
     avatar_url text,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
     primary key (id)
   );

   -- Set up Row Level Security (RLS)
   alter table profiles enable row level security;

   create policy "Public profiles are viewable by everyone."
     on profiles for select
     using ( true );

   create policy "Users can insert their own profile."
     on profiles for insert
     with check ( auth.uid() = id );

   create policy "Users can update own profile."
     on profiles for update
     using ( auth.uid() = id );
   ```

2. **Función para crear perfil automáticamente:**
   ```sql
   -- inserts a row into public.profiles
   create function public.handle_new_user()
   returns trigger
   language plpgsql
   security definer set search_path = public
   as $$
   begin
     insert into public.profiles (id, full_name, username)
     values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'username');
     return new;
   end;
   $$;

   -- trigger the function every time a user is created
   create trigger on_auth_user_created
     after insert on auth.users
     for each row execute procedure public.handle_new_user();
   ```

## 🧪 Probar la Aplicación

1. **Ejecutar la aplicación:**
   ```bash
   npm run dev
   ```

2. **Crear cuenta de prueba:**
   - Ve a la pantalla de registro
   - Crea una cuenta con un email válido
   - Revisa tu email para la confirmación
   - Inicia sesión

## 🔧 Funcionalidades Implementadas

### ✅ Autenticación Básica
- [x] Registro de usuarios
- [x] Inicio de sesión
- [x] Cierre de sesión
- [x] Recuperación de contraseña
- [x] Verificación por email
- [x] Persistencia de sesión
- [x] Protección de rutas

### ✅ Integración con la UI
- [x] Pantalla de autenticación unificada
- [x] Formularios con validación
- [x] Manejo de errores
- [x] Estados de carga
- [x] Transiciones suaves
- [x] Responsive design

### ✅ Gestión de Estado
- [x] Composable `useAuth`
- [x] Estado global reactivo
- [x] Perfil de usuario
- [x] Auto-refresh de tokens

## 📱 Uso de la Aplicación

### Cuentas Demo

Para pruebas rápidas, puedes usar estas credenciales (crear en tu Supabase):

```
Email: demo@hotel.com
Password: demo123456
```

### Flujo de Usuario

1. **Primera visita**: Pantalla de autenticación
2. **Registro**: Formulario con validación completa
3. **Verificación**: Email de confirmación
4. **Login**: Acceso a la aplicación principal
5. **Perfil**: Datos del usuario autenticado

## 🛠️ Personalización

### Modificar Datos del Perfil

Edita `src/composables/useAuth.js` en la función `loadUserProfile()`:

```javascript
const loadUserProfile = async () => {
  if (!user.value) return

  userProfile.id = user.value.id
  userProfile.name = user.value.user_metadata?.full_name || 'Guest User'
  userProfile.email = user.value.email
  userProfile.avatar = user.value.user_metadata?.avatar_url || ''
  
  // Personaliza estos datos según tu lógica
  userProfile.room = '305'
  userProfile.checkIn = '2025-08-08'
  userProfile.checkOut = '2025-08-12'
}
```

### Agregar Más Campos de Registro

Modifica `src/components/auth/RegisterForm.vue` para incluir campos adicionales en el metadata.

## 🔒 Seguridad

- ✅ Solo se usa Anon Public Key (nunca Service Role Key)
- ✅ Row Level Security habilitada
- ✅ Tokens auto-refrescados
- ✅ Sesiones persistentes seguras
- ✅ Validación de email obligatoria

## 🆘 Solución de Problemas

### Error: "Invalid login credentials"
- Verifica que el email esté confirmado
- Revisa que las credenciales sean correctas

### Error: "No se encontró supabase-config.js"
- Asegúrate de haber creado el archivo desde el ejemplo
- Verifica que las credenciales sean correctas

### Error: "Failed to fetch"
- Revisa la URL del proyecto en la configuración
- Verifica tu conexión a internet
- Confirma que el proyecto Supabase esté activo

### El usuario no se mantiene logueado
- Verifica que `persistSession: true` esté en la configuración
- Revisa que no hay errores en la consola del navegador

## 📚 Recursos Adicionales

- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [Vue 3 + Supabase Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-vue-3)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

¡La autenticación está lista! 🎉 La aplicación ahora requiere autenticación para acceder a las funcionalidades principales.
