<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 mb-2">My Bookings</h1>
      <p class="text-gray-600">Manage your resort activity reservations</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card class="p-4">
        <div class="flex items-center space-x-3">
          <div class="bg-blue-100 p-2 rounded-lg">
            <Calendar class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-semibold text-gray-900">{{ upcomingBookings.length }}</p>
            <p class="text-sm text-gray-600">Upcoming</p>
          </div>
        </div>
      </Card>
      
      <Card class="p-4">
        <div class="flex items-center space-x-3">
          <div class="bg-green-100 p-2 rounded-lg">
            <Check class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-semibold text-gray-900">8</p>
            <p class="text-sm text-gray-600">Completed</p>
          </div>
        </div>
      </Card>
      
      <Card class="p-4">
        <div class="flex items-center space-x-3">
          <div class="bg-orange-100 p-2 rounded-lg">
            <Clock class="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p class="text-2xl font-semibold text-gray-900">$340</p>
            <p class="text-sm text-gray-600">Total Spent</p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Bookings Tabs -->
    <Tabs
      v-model="activeTab"
      :tabs="[
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'history', label: 'History' }
      ]"
    >
      <!-- Tab Headers -->
      <template #tab="{ tab }">
        <div class="flex items-center space-x-2">
          <Calendar v-if="tab.value === 'upcoming'" class="w-4 h-4" />
          <Clock v-else class="w-4 h-4" />
          <span>{{ tab.label }}</span>
        </div>
      </template>

      <!-- Upcoming Content -->
      <template #content-upcoming>
        <div class="space-y-4">
          <BookingCard
            v-for="booking in upcomingBookings"
            :key="booking.id"
            :booking="booking"
            @view-details="$emit('view-activity', booking.activity.id)"
          />
          <EmptyState
            v-if="upcomingBookings.length === 0"
            type="upcoming"
            @browse-activities="$emit('view-activity', '')"
          />
        </div>
      </template>

      <!-- History Content -->
      <template #content-history>
        <div class="space-y-4">
          <BookingCard
            v-for="booking in pastBookings"
            :key="booking.id"
            :booking="booking"
            @view-details="$emit('view-activity', booking.activity.id)"
          />
          <EmptyState
            v-if="pastBookings.length === 0"
            type="past"
          />
        </div>
      </template>
    </Tabs>

    <!-- Next Booking Reminder -->
    <Card
      v-if="upcomingBookings.length > 0"
      class="p-4 bg-blue-50 border-blue-200"
    >
      <div class="flex items-center space-x-3">
        <div class="bg-blue-100 p-2 rounded-lg">
          <Calendar class="w-5 h-5 text-blue-600" />
        </div>
        <div class="flex-1">
          <h3 class="font-medium text-blue-900">Next Activity</h3>
          <p class="text-sm text-blue-700">
            {{ upcomingBookings[0].activity.title }} tomorrow at {{ upcomingBookings[0].timeSlot.startTime }}
          </p>
        </div>
        <Button size="sm" variant="outline" class="border-blue-300 text-blue-700">
          View Details
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { Calendar, Clock, MapPin, User, MoreVertical, Check, X } from 'lucide-vue-next';
import { mockBookings, mockActivities, generateTimeSlots } from '@/lib/mock-data.js';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import Tabs from '@/components/ui/Tabs.vue';
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue';

// Booking Card Component
const BookingCard = {
  name: 'BookingCard',
  components: { Card, Badge, Button, ImageWithFallback, Calendar, Clock, MapPin, MoreVertical },
  props: {
    booking: Object
  },
  computed: {
    isUpcoming() {
      return this.booking.status === 'confirmed';
    }
  },
  template: `
    <Card class="overflow-hidden">
      <div class="flex">
        <div class="flex-shrink-0">
          <ImageWithFallback
            :src="booking.activity.image"
            :alt="booking.activity.title"
            class="w-20 h-20 sm:w-24 sm:h-24 object-cover"
          />
        </div>
        
        <div class="flex-1 p-4">
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 mb-1">
                {{ booking.activity.title }}
              </h3>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <Calendar class="w-4 h-4" />
                  <span>{{ new Date(booking.timeSlot.date).toLocaleDateString() }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Clock class="w-4 h-4" />
                  <span>{{ booking.timeSlot.startTime }}</span>
                </div>
              </div>
              <div class="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                <MapPin class="w-4 h-4" />
                <span>{{ booking.activity.location }}</span>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <Badge
                :variant="isUpcoming ? 'default' : 'secondary'"
                :class="isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
              >
                {{ isUpcoming ? 'Confirmed' : 'Cancelled' }}
              </Badge>
              <Button variant="ghost" size="icon" class="w-8 h-8">
                <MoreVertical class="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div class="flex items-center justify-between mt-3">
            <div class="text-sm text-gray-600">
              <span class="font-medium">\${{ booking.activity.price }}</span>
              <span> • Duration: {{ booking.activity.duration }} min</span>
            </div>
            
            <div class="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                @click="$emit('view-details')"
              >
                View Details
              </Button>
              <Button v-if="isUpcoming" variant="destructive" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  `,
  emits: ['view-details']
};

// Empty State Component
const EmptyState = {
  name: 'EmptyState',
  components: { Calendar, Clock, Button },
  props: {
    type: {
      type: String,
      validator: value => ['upcoming', 'past'].includes(value)
    }
  },
  computed: {
    icon() {
      return this.type === 'upcoming' ? Calendar : Clock;
    },
    title() {
      return this.type === 'upcoming' ? 'No upcoming bookings' : 'No past bookings';
    },
    description() {
      return this.type === 'upcoming' 
        ? 'Book your first activity to get started' 
        : 'Your completed activities will appear here';
    }
  },
  template: `
    <div class="text-center py-12">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <component :is="icon" class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
      <p class="text-gray-600 mb-4">{{ description }}</p>
      <Button v-if="type === 'upcoming'" @click="$emit('browse-activities')">
        Browse Activities
      </Button>
    </div>
  `,
  emits: ['browse-activities']
};

export default {
  name: 'BookingsScreen',
  components: {
    Calendar,
    Clock,
    Check,
    Card,
    Button,
    Tabs,
    BookingCard,
    EmptyState
  },
  emits: ['view-activity'],
  data() {
    return {
      activeTab: 'upcoming'
    };
  },
  computed: {
    bookingsWithDetails() {
      return mockBookings.map(booking => {
        const activity = mockActivities.find(a => a.id === booking.activityId);
        const timeSlots = generateTimeSlots(booking.activityId, '2025-08-09');
        const timeSlot = timeSlots.find(ts => ts.id === booking.timeSlotId) || timeSlots[0];
        
        return {
          ...booking,
          activity,
          timeSlot
        };
      });
    },
    upcomingBookings() {
      return this.bookingsWithDetails.filter(b => b.status === 'confirmed');
    },
    pastBookings() {
      return this.bookingsWithDetails.filter(b => b.status === 'cancelled');
    }
  }
};
</script>
