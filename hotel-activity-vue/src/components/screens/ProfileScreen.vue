<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 mb-2">Profile</h1>
      <p class="text-gray-600">Manage your account and preferences</p>
    </div>

          <!-- Profile Header -->
      <ProfileHeader :user-profile="userProfile" />

    <!-- Quick Logout Button -->
    <Card class="p-4 border-2 border-red-200 bg-red-50">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <LogOut class="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-red-900">Cerrar Sesión</h3>
            <p class="text-sm text-red-700">Salir de forma segura de tu cuenta</p>
          </div>
        </div>
        <Button 
          @click="$emit('logout')"
          class="bg-red-600 hover:bg-red-700 text-white border-0"
        >
          <LogOut class="w-4 h-4 mr-2" />
          Salir
        </Button>
      </div>
    </Card>

    <!-- Stats -->
    <StatsCard />

    <!-- Favorite Activities -->
    <Card class="p-6">
      <h3 class="font-semibold text-gray-900 mb-4">Favorite Activities</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="(activity, index) in favoriteActivities"
          :key="index"
          class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
        >
          <ImageWithFallback
            :src="activity.image"
            :alt="activity.name"
            class="w-10 h-10 object-cover rounded-lg"
          />
          <div class="flex-1">
            <p class="font-medium text-gray-900 text-sm">{{ activity.name }}</p>
            <p class="text-xs text-gray-500">Booked {{ activity.bookings }} times</p>
          </div>
        </div>
      </div>
    </Card>

    <!-- Staff Dashboard (Solo para Staff) -->
    <StaffDashboard v-if="userProfile.role === 'staff'" />

    <!-- Settings -->
    <SettingsSection />

    <!-- Menu Options -->
    <div class="space-y-3">
      <MenuOption
        :icon="CreditCard"
        title="Payment Methods"
        description="Manage your payment options"
        @click="() => {}"
      />
      
      <MenuOption
        :icon="Bell"
        title="Notification Preferences"
        description="Customize how you receive updates"
        @click="() => {}"
      />
      
      <MenuOption
        :icon="HelpCircle"
        title="Help & Support"
        description="Get assistance or contact concierge"
        @click="() => {}"
      />
      
      <MenuOption
        :icon="Settings"
        title="Account Settings"
        description="Privacy, security, and account options"
        @click="() => {}"
      />
      
      <MenuOption
        :icon="LogOut"
        title="Cerrar Sesión"
        description="Salir de tu cuenta"
        variant="danger"
        @click="$emit('logout')"
      />
    </div>

    <!-- Resort Contact -->
    <Card class="p-6 bg-blue-50 border-blue-200">
      <h3 class="font-semibold text-blue-900 mb-3">Need Assistance?</h3>
      <p class="text-sm text-blue-700 mb-4">
        Our concierge team is available 24/7 to help with your stay.
      </p>
      <div class="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" class="border-blue-300 text-blue-700 flex-1">
          <Phone class="w-4 h-4 mr-2" />
          Call Concierge
        </Button>
        <Button variant="outline" class="border-blue-300 text-blue-700 flex-1">
          <Mail class="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { 
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  Edit,
  Camera,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Users,
  Briefcase,
  Crown,
  Shield,
  BarChart3,
  UserCheck,
  Activity,
  Clipboard
} from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth.js';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Avatar from '@/components/ui/Avatar.vue';
import Badge from '@/components/ui/Badge.vue';
import Switch from '@/components/ui/Switch.vue';
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue';

// Profile Header Component
const ProfileHeader = {
  name: 'ProfileHeader',
  components: { Card, Avatar, Badge, Button, Camera, MapPin, Calendar, Edit, Users, Briefcase, Crown, Shield },
  props: {
    userProfile: {
      type: Object,
      required: true
    }
  },
  computed: {
    isStaff() {
      return this.userProfile.role === 'staff';
    },
    roleInfo() {
      return this.isStaff 
        ? { 
            label: 'Personal del Hotel', 
            icon: 'Briefcase',
            bgColor: 'bg-purple-100', 
            textColor: 'text-purple-800',
            description: 'Staff Member'
          }
        : { 
            label: 'Huésped VIP', 
            icon: 'Crown',
            bgColor: 'bg-blue-100', 
            textColor: 'text-blue-800',
            description: 'VIP Guest'
          };
    },
    buttonColors() {
      return this.isStaff 
        ? 'bg-purple-600 hover:bg-purple-700 text-white'
        : 'bg-blue-600 hover:bg-blue-700 text-white';
    },
    cameraButtonColors() {
      return this.isStaff 
        ? 'bg-purple-600 hover:bg-purple-700'
        : 'bg-blue-600 hover:bg-blue-700';
    }
  },
  template: `
    <Card class="p-6">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <Avatar 
            :src="userProfile.avatar" 
            :alt="userProfile.name"
            class="w-20 h-20"
          />
          <button :class="'absolute -bottom-1 -right-1 p-2 rounded-full text-white ' + cameraButtonColors">
            <Camera class="w-3 h-3" />
          </button>
        </div>
        
        <div class="flex-1">
          <div class="flex items-center space-x-2 mb-1">
            <h2 class="text-xl font-semibold text-gray-900">{{ userProfile.name }}</h2>
            <Badge :class="roleInfo.bgColor + ' ' + roleInfo.textColor">
              <component :is="roleInfo.icon" class="w-3 h-3 mr-1" />
              {{ roleInfo.label }}
            </Badge>
          </div>
          <p class="text-gray-600 mb-2">{{ userProfile.email }}</p>
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <div class="flex items-center space-x-1">
              <MapPin class="w-4 h-4" />
              <span>{{ isStaff ? 'Staff Area' : 'Room ' + userProfile.room }}</span>
            </div>
            <div v-if="!isStaff" class="flex items-center space-x-1">
              <Calendar class="w-4 h-4" />
              <span>Check-out: {{ userProfile.checkOut }}</span>
            </div>
            <div v-if="isStaff" class="flex items-center space-x-1">
              <Shield class="w-4 h-4" />
              <span>{{ roleInfo.description }}</span>
            </div>
          </div>
        </div>
        
        <Button :class="'text-white border-0 ' + buttonColors" size="sm">
          <Edit class="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>
    </Card>
  `
};

// Stats Card Component
const StatsCard = {
  name: 'StatsCard',
  components: { Card },
  template: `
    <Card class="p-6">
      <h3 class="font-semibold text-gray-900 mb-4">Your Activity Stats</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="text-center">
          <p class="text-2xl font-bold text-blue-600">12</p>
          <p class="text-sm text-gray-600">Activities Booked</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-green-600">8</p>
          <p class="text-sm text-gray-600">Completed</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-orange-600">4.9</p>
          <p class="text-sm text-gray-600">Avg Rating</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-purple-600">$480</p>
          <p class="text-sm text-gray-600">Total Spent</p>
        </div>
      </div>
    </Card>
  `
};

// Staff Dashboard Component
const StaffDashboard = {
  name: 'StaffDashboard',
  components: { Card, Button, BarChart3, UserCheck, Activity, Clipboard, Briefcase },
  template: `
    <Card class="p-6 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100">
      <div class="flex items-center space-x-3 mb-6">
        <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <Briefcase class="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">Staff Dashboard</h3>
          <p class="text-sm text-purple-700">Hotel management tools</p>
        </div>
      </div>

      <!-- Staff Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="text-center p-3 bg-white rounded-lg border border-purple-200">
          <p class="text-2xl font-bold text-purple-600">48</p>
          <p class="text-xs text-gray-600">Active Guests</p>
        </div>
        <div class="text-center p-3 bg-white rounded-lg border border-purple-200">
          <p class="text-2xl font-bold text-green-600">23</p>
          <p class="text-xs text-gray-600">Today's Bookings</p>
        </div>
        <div class="text-center p-3 bg-white rounded-lg border border-purple-200">
          <p class="text-2xl font-bold text-orange-600">95%</p>
          <p class="text-xs text-gray-600">Occupancy</p>
        </div>
        <div class="text-center p-3 bg-white rounded-lg border border-purple-200">
          <p class="text-2xl font-bold text-blue-600">4.8</p>
          <p class="text-xs text-gray-600">Satisfaction</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button 
          class="bg-purple-600 hover:bg-purple-700 text-white border-0 flex-col h-auto py-3 px-2"
          size="sm"
        >
          <BarChart3 class="w-4 h-4 mb-1" />
          <span class="text-xs">Analytics</span>
        </Button>
        
        <Button 
          class="bg-purple-600 hover:bg-purple-700 text-white border-0 flex-col h-auto py-3 px-2"
          size="sm"
        >
          <UserCheck class="w-4 h-4 mb-1" />
          <span class="text-xs">Guests</span>
        </Button>
        
        <Button 
          class="bg-purple-600 hover:bg-purple-700 text-white border-0 flex-col h-auto py-3 px-2"
          size="sm"
        >
          <Activity class="w-4 h-4 mb-1" />
          <span class="text-xs">Activities</span>
        </Button>
        
        <Button 
          class="bg-purple-600 hover:bg-purple-700 text-white border-0 flex-col h-auto py-3 px-2"
          size="sm"
        >
          <Clipboard class="w-4 h-4 mb-1" />
          <span class="text-xs">Reports</span>
        </Button>
      </div>
    </Card>
  `
};

// Settings Section Component
const SettingsSection = {
  name: 'SettingsSection',
  components: { Card, Switch },
  data() {
    return {
      notifications: {
        bookingReminders: true,
        promotions: false,
        weeklyDigest: true
      }
    };
  },
  template: `
    <Card class="p-6">
      <h3 class="font-semibold text-gray-900 mb-4">Notification Settings</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900">Booking Reminders</p>
            <p class="text-sm text-gray-500">Get notified about upcoming activities</p>
          </div>
          <Switch
            v-model:checked="notifications.bookingReminders"
          />
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900">Promotions & Offers</p>
            <p class="text-sm text-gray-500">Receive special deals and discounts</p>
          </div>
          <Switch
            v-model:checked="notifications.promotions"
          />
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900">Weekly Digest</p>
            <p class="text-sm text-gray-500">Summary of available activities</p>
          </div>
          <Switch
            v-model:checked="notifications.weeklyDigest"
          />
        </div>
      </div>
    </Card>
  `
};

// Menu Option Component
const MenuOption = {
  name: 'MenuOption',
  props: {
    icon: Object,
    title: String,
    description: String,
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'danger'].includes(value)
    }
  },
  computed: {
    buttonClasses() {
      const baseClasses = 'w-full p-4 rounded-lg border transition-colors text-left';
      const dangerClasses = 'border-red-200 bg-red-50 hover:bg-red-100';
      const defaultClasses = 'border-gray-200 bg-white hover:bg-gray-50';
      
      return `${baseClasses} ${this.variant === 'danger' ? dangerClasses : defaultClasses}`;
    },
    iconClasses() {
      return `w-5 h-5 ${this.variant === 'danger' ? 'text-red-600' : 'text-gray-600'}`;
    },
    titleClasses() {
      return `font-medium ${this.variant === 'danger' ? 'text-red-900' : 'text-gray-900'}`;
    },
    descriptionClasses() {
      return `text-sm ${this.variant === 'danger' ? 'text-red-700' : 'text-gray-500'}`;
    }
  },
  template: `
    <button :class="buttonClasses" @click="$emit('click')">
      <div class="flex items-center space-x-3">
        <component :is="icon" :class="iconClasses" />
        <div class="flex-1">
          <p :class="titleClasses">{{ title }}</p>
          <p :class="descriptionClasses">{{ description }}</p>
        </div>
      </div>
    </button>
  `,
  emits: ['click']
};

export default {
  name: 'ProfileScreen',
  components: {
    Card,
    Button,
    ImageWithFallback,
    ProfileHeader,
    StatsCard,
    StaffDashboard,
    SettingsSection,
    MenuOption,
    Phone,
    Mail
  },
  emits: ['logout'],
  setup() {
    const { userProfile } = useAuth();
    return { userProfile };
  },
  data() {
    return {
      CreditCard,
      Bell,
      HelpCircle,
      Settings,
      LogOut,
      favoriteActivities: [
        {
          name: 'Morning Yoga',
          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=50&h=50&fit=crop',
          bookings: 3
        },
        {
          name: 'Spa & Sauna',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop',
          bookings: 2
        },
        {
          name: 'Surf Lessons',
          image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=50&h=50&fit=crop',
          bookings: 1
        }
      ]
    };
  }
};
</script>
