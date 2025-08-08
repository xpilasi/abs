<template>
  <Card class="w-full max-w-md mx-auto">
    <div class="p-6">
      <!-- Header -->
      <div class="text-center mb-6">
        <div :class="`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
          isStaffRole ? 'bg-purple-600' : 'bg-blue-600'
        }`">
          <component :is="isStaffRole ? Briefcase : Users" class="w-6 h-6 text-white" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900">
          Create {{ isStaffRole ? 'Staff' : 'Guest' }} Account
        </h2>
        <p class="text-gray-600 mt-2">
          {{ isStaffRole 
            ? 'Register as hotel staff to access management features' 
            : 'Join us to start booking amazing activities' 
          }}
        </p>
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

      <!-- Register Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Full Name -->
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <Input
            id="fullName"
            v-model="form.fullName"
            type="text"
            placeholder="Enter your full name"
            :disabled="isLoading"
            required
          />
        </div>

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

        <!-- User Role Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            I am registering as:
          </label>
          <div class="grid grid-cols-2 gap-3">
            <!-- Guest Option -->
            <div 
              @click="form.role = USER_ROLES.GUEST"
              :class="`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                form.role === USER_ROLES.GUEST 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`"
            >
              <div class="flex items-center space-x-3">
                <div :class="`w-10 h-10 rounded-lg flex items-center justify-center ${
                  form.role === USER_ROLES.GUEST ? 'bg-blue-500' : 'bg-gray-400'
                }`">
                  <Users class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ ROLE_LABELS[USER_ROLES.GUEST].title }}</h3>
                  <p class="text-xs text-gray-600">{{ ROLE_LABELS[USER_ROLES.GUEST].subtitle }}</p>
                </div>
              </div>
              <div v-if="form.role === USER_ROLES.GUEST" class="absolute top-2 right-2">
                <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle class="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            <!-- Staff Option -->
            <div 
              @click="form.role = USER_ROLES.STAFF"
              :class="`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                form.role === USER_ROLES.STAFF 
                  ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500 ring-opacity-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`"
            >
              <div class="flex items-center space-x-3">
                <div :class="`w-10 h-10 rounded-lg flex items-center justify-center ${
                  form.role === USER_ROLES.STAFF ? 'bg-purple-500' : 'bg-gray-400'
                }`">
                  <Briefcase class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ ROLE_LABELS[USER_ROLES.STAFF].title }}</h3>
                  <p class="text-xs text-gray-600">{{ ROLE_LABELS[USER_ROLES.STAFF].subtitle }}</p>
                </div>
              </div>
              <div v-if="form.role === USER_ROLES.STAFF" class="absolute top-2 right-2">
                <div class="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                  <CheckCircle class="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Master Key for Staff -->
        <div v-if="isStaffRole" class="animate-fadeIn">
          <label for="masterKey" class="block text-sm font-medium text-gray-700 mb-1">
            <div class="flex items-center space-x-2">
              <Key class="w-4 h-4 text-purple-600" />
              <span>Staff Master Key</span>
            </div>
          </label>
          <Input
            id="masterKey"
            v-model="form.masterKey"
            type="password"
            placeholder="Enter the staff master key"
            :disabled="isLoading"
            required
          />
          <p class="mt-1 text-xs text-purple-600">
            This key is required to create staff accounts. Contact administration if you don't have it.
          </p>
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
              placeholder="Create a password"
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
          <div class="mt-1">
            <div class="flex items-center space-x-1 text-xs">
              <div 
                :class="`w-2 h-2 rounded-full ${passwordStrength.score >= 1 ? 'bg-red-500' : 'bg-gray-300'}`"
              ></div>
              <div 
                :class="`w-2 h-2 rounded-full ${passwordStrength.score >= 2 ? 'bg-yellow-500' : 'bg-gray-300'}`"
              ></div>
              <div 
                :class="`w-2 h-2 rounded-full ${passwordStrength.score >= 3 ? 'bg-green-500' : 'bg-gray-300'}`"
              ></div>
              <span class="ml-2 text-gray-600">{{ passwordStrength.text }}</span>
            </div>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            v-model="form.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm your password"
            :disabled="isLoading"
            required
          />
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Eye v-if="!showConfirmPassword" class="w-4 h-4" />
            <EyeOff v-else class="w-4 h-4" />
          </button>
          <p 
            v-if="form.confirmPassword && !passwordsMatch" 
            class="mt-1 text-xs text-red-600"
          >
            Passwords do not match
          </p>
        </div>

        <!-- Terms -->
        <div class="flex items-start space-x-2">
          <input
            id="terms"
            v-model="form.acceptTerms"
            type="checkbox"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
            required
          />
          <label for="terms" class="text-sm text-gray-600">
            I agree to the 
            <a href="#" class="text-blue-600 hover:text-blue-800">Terms of Service</a>
            and 
            <a href="#" class="text-blue-600 hover:text-blue-800">Privacy Policy</a>
          </label>
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          :class="`w-full ${
            isStaffRole 
              ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500' 
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
          }`"
          :disabled="isLoading || !isFormValid"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          {{ isLoading 
            ? `Creating ${isStaffRole ? 'staff' : 'guest'} account...` 
            : `Create ${isStaffRole ? 'Staff' : 'Guest'} Account` 
          }}
        </Button>
      </form>

      <!-- Login Link -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
          <button
            @click="$emit('switch-to-login')"
            class="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  </Card>
</template>

<script>
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle, Loader2, Users, Briefcase, Key } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth.js';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'RegisterForm',
  components: {
    UserPlus,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle,
    Loader2,
    Users,
    Briefcase,
    Key,
    Card,
    Input,
    Button
  },
  emits: ['switch-to-login', 'register-success'],
  setup(props, { emit }) {
    const { signUp, authError, isLoading, clearAuthError, USER_ROLES, ROLE_LABELS } = useAuth();
    
    return {
      signUp,
      authError,
      isLoading,
      clearAuthError,
      emit,
      USER_ROLES,
      ROLE_LABELS
    };
  },
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      successMessage: '',
      form: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        role: this.USER_ROLES.GUEST,
        masterKey: ''
      }
    };
  },
  computed: {
    passwordsMatch() {
      return this.form.password === this.form.confirmPassword;
    },
    
    passwordStrength() {
      const password = this.form.password;
      let score = 0;
      let text = 'Too weak';

      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      if (score === 0) text = 'Too weak';
      else if (score === 1) text = 'Weak';
      else if (score === 2) text = 'Fair';
      else if (score === 3) text = 'Good';
      else if (score === 4) text = 'Strong';

      return { score, text };
    },

    isFormValid() {
      const baseValid = (
        this.form.fullName.trim() &&
        this.form.email &&
        this.form.password.length >= 6 &&
        this.passwordsMatch &&
        this.form.acceptTerms
      );

      // Para staff, también validar clave master
      if (this.form.role === this.USER_ROLES.STAFF) {
        return baseValid && this.form.masterKey.trim();
      }

      return baseValid;
    },

    // Verificar si es staff seleccionado
    isStaffRole() {
      return this.form.role === this.USER_ROLES.STAFF;
    },

    // Obtener colores del tema según rol
    roleTheme() {
      return this.isStaffRole ? 'purple' : 'blue';
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.isFormValid) return;

      this.clearAuthError();
      this.successMessage = '';

      const result = await this.signUp(
        this.form.email,
        this.form.password,
        this.form.fullName,
        this.form.role,
        this.form.masterKey
      );

      if (result.success) {
        this.successMessage = result.message;
        this.$emit('register-success');
        
        // Reset form
        this.resetForm();
      }
    },

    resetForm() {
      this.form = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        role: this.USER_ROLES.GUEST,
        masterKey: ''
      };
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

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
