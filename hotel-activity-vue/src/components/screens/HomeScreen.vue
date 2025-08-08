<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold mb-1">Welcome back, {{ userName }}! 👋</h1>
          <p class="text-blue-100">{{ todayDate }}</p>
          <p class="text-blue-100 text-sm mt-1">Room {{ userProfile.room }} • Check-out: {{ userProfile.checkOut }}</p>
        </div>
        <div class="text-right">
          <div class="bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm">
            <p class="text-sm font-medium">Today's Weather</p>
            <p class="text-lg">28°C ☀️</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <QuickActionCard
          title="Book Activity"
          description="Find your next adventure"
          :icon="Calendar"
          gradient="hotel-gradient"
          @click="$emit('navigate', 'activities')"
        />
        <QuickActionCard
          title="My Bookings"
          description="View upcoming activities"
          :icon="Clock"
          gradient="bg-gradient-to-r from-emerald-500 to-emerald-600"
          @click="$emit('navigate', 'bookings')"
        />
      </div>
    </div>

    <!-- Featured Activities -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Featured Activities</h2>
        <Button 
          variant="ghost" 
          size="sm"
          class="text-blue-600 hover:text-blue-700"
          @click="$emit('navigate', 'activities')"
        >
          View All
        </Button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActivityCard
          v-for="activity in featuredActivities"
          :key="activity.id"
          :activity="activity"
          @click="$emit('navigate', 'activities', activity.id)"
        />
      </div>
    </div>

    <!-- Popular This Week -->
    <div>
      <div class="flex items-center space-x-2 mb-4">
        <TrendingUp class="w-5 h-5 text-orange-500" />
        <h2 class="text-lg font-semibold text-gray-900">Popular This Week</h2>
      </div>
      <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div class="flex items-center space-x-4">
          <ImageWithFallback
            :src="popularActivity.image"
            :alt="popularActivity.title"
            class="w-16 h-16 object-cover rounded-lg"
          />
          <div class="flex-1">
            <h3 class="font-medium text-gray-900">{{ popularActivity.title }}</h3>
            <p class="text-sm text-gray-600">Most booked this week</p>
            <div class="flex items-center space-x-2 mt-1">
              <span class="text-sm font-medium text-orange-600">${{ popularActivity.price }}</span>
              <span class="text-xs text-gray-500">• {{ popularActivity.duration }} min</span>
            </div>
          </div>
          <Button 
            size="sm"
            class="bg-orange-600 hover:bg-orange-700"
            @click="$emit('navigate', 'activities', popularActivity.id)"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar, Clock, MapPin, Star, TrendingUp } from 'lucide-vue-next';
import { mockActivities } from '@/lib/mock-data.js';
import { useAuth } from '@/composables/useAuth.js';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue';

// Quick Action Card Component
const QuickActionCard = {
  name: 'QuickActionCard',
  components: { Card },
  props: {
    title: String,
    description: String,
    icon: Object,
    gradient: String
  },
  template: `
    <Card 
      :class="\`p-4 cursor-pointer hover:shadow-lg transition-all duration-200 \${gradient}\`"
      @click="$emit('click')"
    >
      <div class="flex items-center space-x-3">
        <div class="bg-white/20 p-2 rounded-lg">
          <component :is="icon" class="w-5 h-5 text-white" />
        </div>
        <div class="flex-1">
          <h3 class="font-medium text-white">{{ title }}</h3>
          <p class="text-sm text-white/80">{{ description }}</p>
        </div>
      </div>
    </Card>
  `,
  emits: ['click']
};

// Activity Card Component
const ActivityCard = {
  name: 'ActivityCard',
  components: { Card, ImageWithFallback, Clock, MapPin, Star },
  props: {
    activity: Object
  },
  template: `
    <Card 
      class="cursor-pointer hover:shadow-lg transition-all duration-200"
      @click="$emit('click')"
    >
      <div class="relative">
        <ImageWithFallback
          :src="activity.image"
          :alt="activity.title"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <span class="text-sm font-medium text-gray-900">\${{ activity.price }}</span>
        </div>
        <div v-if="activity.difficulty" class="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full">
          <span class="text-xs font-medium capitalize">{{ activity.difficulty }}</span>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-start justify-between mb-2">
          <h3 class="font-semibold text-gray-900 flex-1">{{ activity.title }}</h3>
          <div class="flex items-center space-x-1 ml-2">
            <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span class="text-sm text-gray-600">4.8</span>
          </div>
        </div>
        <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ activity.description }}</p>
        <div class="flex items-center justify-between text-sm text-gray-500">
          <div class="flex items-center space-x-1">
            <Clock class="w-4 h-4" />
            <span>{{ activity.duration }} min</span>
          </div>
          <div class="flex items-center space-x-1">
            <MapPin class="w-4 h-4" />
            <span>{{ activity.location }}</span>
          </div>
        </div>
      </div>
    </Card>
  `,
  emits: ['click']
};

export default {
  name: 'HomeScreen',
  components: {
    Calendar,
    Clock,
    TrendingUp,
    Button,
    ImageWithFallback,
    QuickActionCard,
    ActivityCard
  },
  emits: ['navigate'],
  setup() {
    const { userProfile } = useAuth();
    return { userProfile };
  },
  data() {
    return {
      featuredActivities: mockActivities.slice(0, 3),
      popularActivity: mockActivities[6],
      Calendar,
      Clock
    };
  },
  computed: {
    userName() {
      return this.userProfile.name ? this.userProfile.name.split(' ')[0] : 'Guest';
    },
    todayDate() {
      return new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  }
};
</script>
