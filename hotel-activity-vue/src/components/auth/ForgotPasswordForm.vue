<template>
  <Card class="w-full max-w-md mx-auto">
    <div class="p-6">
      <!-- Header -->
      <div class="text-center mb-6">
        <div class="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <KeyRound class="w-6 h-6 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Reset Password</h2>
        <p class="text-gray-600 mt-2">Enter your email to receive a reset link</p>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"
      >
        <div class="flex items-center space-x-2">
          <CheckCircle class="w-4 h-4 text-green-600" />
          <p class="text-sm text-green-700">{{ successMessage }}</p>
        </div>
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

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email address"
            :disabled="isLoading"
            required
          />
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          class="w-full"
          :disabled="isLoading || !email"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
        </Button>
      </form>

      <!-- Back to Login -->
      <div class="mt-6 text-center">
        <button
          @click="$emit('back-to-login')"
          class="flex items-center justify-center mx-auto text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft class="w-4 h-4 mr-1" />
          Back to Sign In
        </button>
      </div>

      <!-- Info -->
      <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-start space-x-2">
          <Info class="w-4 h-4 text-blue-600 mt-0.5" />
          <div class="text-sm text-blue-700">
            <p>We'll send you an email with instructions to reset your password.</p>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { KeyRound, AlertCircle, CheckCircle, Loader2, ArrowLeft, Info } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth.js';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'ForgotPasswordForm',
  components: {
    KeyRound,
    AlertCircle,
    CheckCircle,
    Loader2,
    ArrowLeft,
    Info,
    Card,
    Input,
    Button
  },
  emits: ['back-to-login'],
  setup() {
    const { resetPassword, authError, isLoading, clearAuthError } = useAuth();
    
    return {
      resetPassword,
      authError,
      isLoading,
      clearAuthError
    };
  },
  data() {
    return {
      email: '',
      successMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.email) return;

      this.clearAuthError();
      this.successMessage = '';

      const result = await this.resetPassword(this.email);

      if (result.success) {
        this.successMessage = result.message;
        this.email = ''; // Clear form
      }
    }
  },
  watch: {
    email() {
      if (this.authError) {
        this.clearAuthError();
      }
    }
  }
};
</script>
