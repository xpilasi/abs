<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center space-x-4">
      <Button variant="ghost" size="icon" @click="$emit('back')">
        <ArrowLeft class="w-5 h-5" />
      </Button>
      <h1 class="text-xl font-semibold text-gray-900">Activity Details</h1>
    </div>

    <!-- Activity Not Found -->
    <div v-if="!activity" class="text-center py-12">
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Activity not found</h2>
      <Button @click="$emit('back')">Go back</Button>
    </div>

    <!-- Activity Content -->
    <template v-else>
      <!-- Hero Image -->
      <div class="relative">
        <ImageWithFallback
          :src="activity.image"
          :alt="activity.title"
          class="w-full h-64 sm:h-80 object-cover rounded-lg"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
        <div class="absolute bottom-4 left-4 right-4 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold mb-2">{{ activity.title }}</h2>
              <div class="flex items-center space-x-4 text-sm">
                <div class="flex items-center space-x-1">
                  <Clock class="w-4 h-4" />
                  <span>{{ activity.duration }} minutes</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Users class="w-4 h-4" />
                  <span>Up to {{ activity.capacity }} people</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8 (127 reviews)</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="text-3xl font-bold">${{ activity.price }}</p>
              <p class="text-sm opacity-90">per person</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Info -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <!-- Description -->
          <Card class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p class="text-gray-600 leading-relaxed mb-4">{{ activity.description }}</p>
            
            <div class="flex items-center space-x-2 mb-4">
              <MapPin class="w-4 h-4 text-gray-400" />
              <span class="text-sm text-gray-600">{{ activity.location }}</span>
            </div>

            <div v-if="activity.instructor" class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 mb-1">Your Instructor</h4>
              <p class="text-sm text-gray-600">{{ activity.instructor }}</p>
            </div>
          </Card>

          <!-- Amenities -->
          <Card class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">What's Included</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="(amenity, index) in activity.amenities"
                :key="index"
                class="flex items-center space-x-2"
              >
                <div class="w-2 h-2 bg-green-500 rounded-full" />
                <span class="text-sm text-gray-600">{{ amenity }}</span>
              </div>
            </div>
          </Card>
        </div>

        <!-- Booking Card -->
        <div class="lg:col-span-1">
          <Card class="p-6 sticky top-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Book Your Spot</h3>
            
            <!-- Date Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Select Date
              </label>
              <div class="flex space-x-2 overflow-x-auto pb-2">
                <DateCard
                  v-for="(date, index) in dates"
                  :key="index"
                  :date="date"
                  :is-selected="isSameDate(date, selectedDate)"
                  @click="selectedDate = date"
                />
              </div>
            </div>

            <!-- Time Slots -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Available Time Slots
              </label>
              <div class="space-y-2 max-h-60 overflow-y-auto">
                <TimeSlotCard
                  v-for="slot in timeSlots"
                  :key="slot.id"
                  :slot="slot"
                  :is-selected="selectedTimeSlot === slot.id"
                  @select="selectedTimeSlot = slot.id"
                />
              </div>
            </div>

            <!-- Book Button -->
            <Button
              class="w-full"
              size="lg"
              :disabled="!selectedTimeSlot"
              @click="handleBookNow"
            >
              {{ selectedTimeSlot ? 'Book Now' : 'Select a time slot' }}
            </Button>

            <p class="text-xs text-gray-500 text-center mt-3">
              Free cancellation up to 2 hours before the activity
            </p>
          </Card>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ArrowLeft, Clock, MapPin, Users, Star, Calendar } from 'lucide-vue-next';
import { mockActivities, generateTimeSlots } from '@/lib/mock-data.js';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue';

// Date Card Component
const DateCard = {
  name: 'DateCard',
  props: {
    date: Date,
    isSelected: Boolean
  },
  computed: {
    weekday() {
      return this.date.toLocaleDateString('en-US', { weekday: 'short' });
    },
    day() {
      return this.date.getDate();
    },
    cardClasses() {
      const baseClasses = 'flex-shrink-0 p-3 rounded-lg text-center transition-all duration-200 cursor-pointer';
      const selectedClasses = 'bg-blue-600 text-white';
      const unselectedClasses = 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300';
      
      return `${baseClasses} ${this.isSelected ? selectedClasses : unselectedClasses}`;
    }
  },
  template: `
    <button :class="cardClasses" @click="$emit('click')">
      <p class="text-xs font-medium uppercase tracking-wide mb-1">
        {{ weekday }}
      </p>
      <p class="text-lg font-semibold">
        {{ day }}
      </p>
    </button>
  `,
  emits: ['click']
};

// Time Slot Card Component
const TimeSlotCard = {
  name: 'TimeSlotCard',
  components: { Card, Badge },
  props: {
    slot: Object,
    isSelected: Boolean
  },
  computed: {
    cardClasses() {
      const baseClasses = 'p-3 cursor-pointer transition-all duration-200';
      
      if (this.isSelected) {
        return `${baseClasses} ring-2 ring-blue-500 bg-blue-50`;
      } else if (this.slot.availableSpots === 0) {
        return `${baseClasses} opacity-50 cursor-not-allowed`;
      } else {
        return `${baseClasses} hover:shadow-md`;
      }
    }
  },
  methods: {
    handleClick() {
      if (this.slot.availableSpots > 0) {
        this.$emit('select');
      }
    }
  },
  template: `
    <Card :class="cardClasses" @click="handleClick">
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium text-gray-900">
            {{ slot.startTime }} - {{ slot.endTime }}
          </p>
          <p class="text-sm text-gray-500">
            {{ slot.availableSpots }} of {{ slot.totalSpots }} spots available
          </p>
        </div>
        <Badge
          v-if="slot.availableSpots === 0"
          variant="secondary"
          class="bg-red-100 text-red-800"
        >
          Full
        </Badge>
      </div>
    </Card>
  `,
  emits: ['select']
};

export default {
  name: 'ActivityDetailScreen',
  components: {
    ArrowLeft,
    Clock,
    MapPin,
    Users,
    Star,
    Card,
    Button,
    Badge,
    ImageWithFallback,
    DateCard,
    TimeSlotCard
  },
  emits: ['back', 'book-time-slot'],
  props: {
    activityId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedDate: new Date(),
      selectedTimeSlot: null
    };
  },
  computed: {
    activity() {
      return mockActivities.find(a => a.id === this.activityId);
    },
    timeSlots() {
      if (!this.activity) return [];
      return generateTimeSlots(this.activityId, this.selectedDate.toISOString().split('T')[0]);
    },
    dates() {
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dates.push(date);
      }
      return dates;
    }
  },
  methods: {
    isSameDate(date1, date2) {
      return date1.toDateString() === date2.toDateString();
    },
    handleBookNow() {
      if (this.selectedTimeSlot) {
        this.$emit('book-time-slot', this.activityId, this.selectedTimeSlot);
      }
    }
  },
  watch: {
    selectedDate() {
      // Reset selected time slot when date changes
      this.selectedTimeSlot = null;
    }
  }
};
</script>
