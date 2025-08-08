<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 mb-2">Profile</h1>
      <p class="text-gray-600">Manage your account and preferences</p>
    </div>

    <!-- Profile Header -->
    <ProfileHeader />

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
        title="Sign Out"
        description="Sign out of your account"
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
  Mail
} from 'lucide-vue-next';
import { mockUser } from '@/lib/mock-data.js';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Avatar from '@/components/ui/Avatar.vue';
import Badge from '@/components/ui/Badge.vue';
import Switch from '@/components/ui/Switch.vue';
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue';

// Profile Header Component
const ProfileHeader = {
  name: 'ProfileHeader',
  components: { Card, Avatar, Badge, Button, Camera, MapPin, Calendar, Edit },
  data() {
    return {
      user: mockUser
    };
  },
  template: `
    <Card class="p-6">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <Avatar 
            :src="user.avatar" 
            :alt="user.name"
            class="w-20 h-20"
          />
          <button class="absolute -bottom-1 -right-1 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700">
            <Camera class="w-3 h-3" />
          </button>
        </div>
        
        <div class="flex-1">
          <div class="flex items-center space-x-2 mb-1">
            <h2 class="text-xl font-semibold text-gray-900">{{ user.name }}</h2>
            <Badge class="bg-yellow-100 text-yellow-800">VIP Guest</Badge>
          </div>
          <p class="text-gray-600 mb-2">{{ user.email }}</p>
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <div class="flex items-center space-x-1">
              <MapPin class="w-4 h-4" />
              <span>Room {{ user.room }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <Calendar class="w-4 h-4" />
              <span>Check-out: {{ user.checkOut }}</span>
            </div>
          </div>
        </div>
        
        <Button variant="outline" size="sm">
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
    SettingsSection,
    MenuOption,
    Phone,
    Mail
  },
  emits: ['logout'],
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
