<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-50" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;20&quot; height=&quot;20&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cdefs%3E%3Cpattern id=&quot;grid&quot; width=&quot;20&quot; height=&quot;20&quot; patternUnits=&quot;userSpaceOnUse&quot;%3E%3Cpath d=&quot;M 20 0 L 0 0 0 20&quot; fill=&quot;none&quot; stroke=&quot;%23f1f5f9&quot; stroke-width=&quot;1&quot;/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=&quot;100%25&quot; height=&quot;100%25&quot; fill=&quot;url(%23grid)&quot;/%3E%3C/svg%3E');"></div>
    
    <div class="relative w-full max-w-md">
      <!-- Hotel Branding -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Activity class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Ocean Paradise Resort</h1>
        <p class="text-gray-600">Activity Management System</p>
      </div>

      <!-- Auth Forms with Transition -->
      <div class="relative">
        <Transition name="slide" mode="out-in">
          <!-- Login Form -->
          <LoginForm
            v-if="currentView === 'login'"
            key="login"
            @switch-to-register="currentView = 'register'"
            @forgot-password="currentView = 'forgot-password'"
            @login-success="handleLoginSuccess"
          />

          <!-- Register Form -->
          <RegisterForm
            v-else-if="currentView === 'register'"
            key="register"
            @switch-to-login="currentView = 'login'"
            @register-success="handleRegisterSuccess"
          />

          <!-- Forgot Password Form -->
          <ForgotPasswordForm
            v-else-if="currentView === 'forgot-password'"
            key="forgot-password"
            @back-to-login="currentView = 'login'"
          />
        </Transition>
      </div>

      <!-- Features -->
      <div class="mt-8 grid grid-cols-3 gap-4 text-center">
        <div class="p-3">
          <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Calendar class="w-4 h-4 text-blue-600" />
          </div>
          <p class="text-xs text-gray-600">Easy Booking</p>
        </div>
        <div class="p-3">
          <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Users class="w-4 h-4 text-green-600" />
          </div>
          <p class="text-xs text-gray-600">Group Activities</p>
        </div>
        <div class="p-3">
          <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Star class="w-4 h-4 text-purple-600" />
          </div>
          <p class="text-xs text-gray-600">Premium Experience</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-xs text-gray-500">
        <p>&copy; 2025 Ocean Paradise Resort. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Activity, Calendar, Users, Star } from 'lucide-vue-next';
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue';

export default {
  name: 'AuthScreen',
  components: {
    Activity,
    Calendar,
    Users,
    Star,
    LoginForm,
    RegisterForm,
    ForgotPasswordForm
  },
  emits: ['auth-success'],
  data() {
    return {
      currentView: 'login' // 'login', 'register', 'forgot-password'
    };
  },
  methods: {
    handleLoginSuccess() {
      this.$emit('auth-success');
    },

    handleRegisterSuccess() {
      // Mostrar mensaje de éxito y cambiar a login después de unos segundos
      setTimeout(() => {
        this.currentView = 'login';
      }, 3000);
    }
  }
};
</script>

<style scoped>
/* Transition animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
