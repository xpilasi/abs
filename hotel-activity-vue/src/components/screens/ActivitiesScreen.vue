<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 mb-2">Activities</h1>
      <p class="text-gray-600">Discover amazing experiences at our resort</p>
    </div>

    <!-- Search and Filters -->
    <div class="space-y-4">
      <div class="flex space-x-3">
        <div class="flex-1 relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            v-model="searchQuery"
            placeholder="Search activities..."
            class="pl-10"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          :class="showFilters ? 'bg-blue-50 text-blue-600' : ''"
          @click="showFilters = !showFilters"
        >
          <Filter class="w-4 h-4" />
        </Button>
      </div>

      <!-- Category Filters -->
      <div class="flex space-x-2 overflow-x-auto pb-2">
        <Button
          v-for="category in categories"
          :key="category.id"
          :variant="selectedCategory === category.id ? 'default' : 'outline'"
          size="sm"
          class="whitespace-nowrap"
          @click="selectedCategory = category.id"
        >
          {{ category.label }}
        </Button>
      </div>
    </div>

    <!-- Results Header -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-gray-600">
        {{ filteredActivities.length }} activities found
      </p>
      <Button
        v-if="searchQuery"
        variant="ghost"
        size="sm"
        class="text-gray-500"
        @click="clearSearch"
      >
        Clear search
      </Button>
    </div>

    <!-- Activities Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ActivityCard
        v-for="activity in filteredActivities"
        :key="activity.id"
        :activity="activity"
        :is-selected="selectedActivityId === activity.id"
        @select="$emit('activity-select', activity.id)"
        @book="$emit('book-activity', activity.id)"
      />
    </div>

    <!-- Empty State -->
    <div v-if="filteredActivities.length === 0" class="text-center py-12">
      <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
      <p class="text-gray-600 mb-4">
        Try adjusting your search criteria or browse all activities
      </p>
      <Button variant="outline" @click="clearFilters">
        Clear filters
      </Button>
    </div>
  </div>
</template>

<script>
import { Search, Filter, Clock, MapPin, Users, Star } from 'lucide-vue-next';
import { mockActivities } from '@/lib/mock-data.js';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Button from '@/components/ui/Button.vue';
import Badge from '@/components/ui/Badge.vue';
import ImageWithFallback from '@/components/figma/ImageWithFallback.vue';

// Activity Card Component
const ActivityCard = {
  name: 'ActivityCard',
  components: { Card, ImageWithFallback, Badge, Button, Clock, Users, MapPin, Star },
  props: {
    activity: Object,
    isSelected: Boolean
  },
  computed: {
    categories() {
      return [
        { id: 'all', label: 'All Activities', color: 'bg-gray-100 text-gray-800' },
        { id: 'wellness', label: 'Wellness', color: 'bg-green-100 text-green-800' },
        { id: 'sports', label: 'Sports', color: 'bg-blue-100 text-blue-800' },
        { id: 'water', label: 'Water Activities', color: 'bg-cyan-100 text-cyan-800' },
        { id: 'experiences', label: 'Experiences', color: 'bg-purple-100 text-purple-800' }
      ];
    },
    categoryInfo() {
      return this.categories.find(cat => cat.id === this.activity.category) || this.categories[0];
    },
    difficultyColor() {
      switch (this.activity.difficulty) {
        case 'beginner': return 'bg-green-100 text-green-800';
        case 'intermediate': return 'bg-yellow-100 text-yellow-800';
        case 'advanced': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  },
  template: `
    <Card 
      :class="\`cursor-pointer transition-all duration-200 hover:shadow-lg \${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }\`"
      @click="$emit('select')"
    >
      <div class="relative">
        <ImageWithFallback
          :src="activity.image"
          :alt="activity.title"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span class="font-semibold text-gray-900">\${{ activity.price }}</span>
        </div>
        <div v-if="activity.difficulty" class="absolute top-3 left-3">
          <Badge 
            variant="secondary"
            :class="difficultyColor"
          >
            {{ activity.difficulty }}
          </Badge>
        </div>
        <div class="absolute bottom-3 left-3">
          <Badge :class="categoryInfo.color">
            {{ categoryInfo.label.replace(' Activities', '') }}
          </Badge>
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
        
        <div class="grid grid-cols-3 gap-2 mb-3 text-xs text-gray-500">
          <div class="flex items-center space-x-1">
            <Clock class="w-3 h-3" />
            <span>{{ activity.duration }}m</span>
          </div>
          <div class="flex items-center space-x-1">
            <Users class="w-3 h-3" />
            <span>Up to {{ activity.capacity }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <MapPin class="w-3 h-3" />
            <span class="truncate">{{ activity.location }}</span>
          </div>
        </div>

        <div v-if="activity.instructor" class="text-xs text-gray-500 mb-3">
          Instructor: <span class="font-medium">{{ activity.instructor }}</span>
        </div>

        <div class="flex space-x-2">
          <Button
            size="sm"
            class="flex-1"
            @click.stop="$emit('book')"
          >
            Book Now
          </Button>
          <Button
            size="sm"
            variant="outline"
            @click.stop="$emit('select')"
          >
            Details
          </Button>
        </div>
      </div>
    </Card>
  `,
  emits: ['select', 'book']
};

export default {
  name: 'ActivitiesScreen',
  components: {
    Search,
    Filter,
    Input,
    Button,
    ActivityCard
  },
  emits: ['activity-select', 'book-activity'],
  props: {
    selectedActivityId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      showFilters: false,
      activities: mockActivities,
      categories: [
        { id: 'all', label: 'All Activities', color: 'bg-gray-100 text-gray-800' },
        { id: 'wellness', label: 'Wellness', color: 'bg-green-100 text-green-800' },
        { id: 'sports', label: 'Sports', color: 'bg-blue-100 text-blue-800' },
        { id: 'water', label: 'Water Activities', color: 'bg-cyan-100 text-cyan-800' },
        { id: 'experiences', label: 'Experiences', color: 'bg-purple-100 text-purple-800' }
      ]
    };
  },
  computed: {
    filteredActivities() {
      return this.activities.filter(activity => {
        const matchesSearch = activity.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                             activity.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === 'all' || activity.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });
    }
  },
  methods: {
    clearSearch() {
      this.searchQuery = '';
    },
    clearFilters() {
      this.searchQuery = '';
      this.selectedCategory = 'all';
    }
  }
};
</script>
