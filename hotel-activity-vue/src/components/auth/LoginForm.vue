<template>
  <Card class="w-full max-w-md mx-auto">
    <div class="p-6">
      <!-- Header -->
      <div class="text-center mb-6">
        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <User class="w-6 h-6 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p class="text-gray-600 mt-2">Sign in to your account to continue</p>
      </div>

      <!-- Error Message -->
      <div
        v-if="authError"
        class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
      >
        <div class="flex items-center space-x-2">
          <AlertCircle class="w-4 h-4 text-red-600" />
          <p class="text-sm text-red-700">{{ authError }}</p>
        </div>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            :disabled="isLoading"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div class="relative">
            <Input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              :disabled="isLoading"
              required
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Eye v-if="!showPassword" class="w-4 h-4" />
              <EyeOff v-else class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              v-model="form.rememberMe"
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span class="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            @click="$emit('forgot-password')"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot password?
          </button>
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          class="w-full"
          :disabled="isLoading || !isFormValid"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </Button>
      </form>

      <!-- Register Link -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <button
            @click="$emit('switch-to-register')"
            class="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up here
          </button>
        </p>
      </div>

      <!-- Demo Credentials -->
      <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-start space-x-2">
          <Info class="w-4 h-4 text-blue-600 mt-0.5" />
          <div class="text-sm text-blue-700">
            <p class="font-medium">Demo Account</p>
            <p>Email: demo@hotel.com</p>
            <p>Password: demo123456</p>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { User, Eye, EyeOff, AlertCircle, Loader2, Info } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth.js';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'LoginForm',
  components: {
    User,
    Eye,
    EyeOff,
    AlertCircle,
    Loader2,
    Info,
    Card,
    Input,
    Button
  },
  emits: ['switch-to-register', 'forgot-password', 'login-success'],
  setup(props, { emit }) {
    const { signIn, authError, isLoading, clearAuthError } = useAuth();
    
    return {
      signIn,
      authError,
      isLoading,
      clearAuthError,
      emit
    };
  },
  data() {
    return {
      showPassword: false,
      form: {
        email: '',
        password: '',
        rememberMe: false
      }
    };
  },
  computed: {
    isFormValid() {
      return this.form.email && this.form.password && this.form.password.length >= 6;
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.isFormValid) return;

      this.clearAuthError();

      const result = await this.signIn(this.form.email, this.form.password);

      if (result.success) {
        this.$emit('login-success');
      }
    },

    // Método para rellenar credenciales demo
    fillDemoCredentials() {
      this.form.email = 'demo@hotel.com';
      this.form.password = 'demo123456';
    }
  },
  watch: {
    // Limpiar errores cuando el usuario empiece a escribir
    'form.email'() {
      if (this.authError) {
        this.clearAuthError();
      }
    },
    'form.password'() {
      if (this.authError) {
        this.clearAuthError();
      }
    }
  }
};
</script>
