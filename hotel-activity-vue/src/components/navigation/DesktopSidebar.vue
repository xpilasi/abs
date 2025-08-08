<template>
  <div
    :class="`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`"
  >
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <div v-if="!isCollapsed" class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Activity class="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 class="font-semibold text-gray-900">Resort Activities</h2>
          <p class="text-sm text-gray-500">Ocean Paradise Resort</p>
        </div>
      </div>
      <button
        @click="isCollapsed = !isCollapsed"
        class="p-1 hover:bg-gray-100 rounded-md"
      >
        <Menu v-if="isCollapsed" class="w-5 h-5" />
        <X v-else class="w-5 h-5" />
      </button>
    </div>

    <nav class="p-4 space-y-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="tabButtonClasses(tab.id)"
        @click="$emit('tab-change', tab.id)"
      >
        <component :is="tab.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="font-medium">{{ tab.label }}</span>
      </button>
    </nav>

    <div v-if="!isCollapsed" class="absolute bottom-4 left-4 right-4">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="font-medium text-blue-900 mb-1">Need Help?</h3>
        <p class="text-sm text-blue-700 mb-2">
          Contact our concierge for assistance
        </p>
        <button class="text-sm font-medium text-blue-600 hover:text-blue-800">
          Call Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Home, Calendar, User, Activity, Menu, X } from 'lucide-vue-next';

export default {
  name: 'DesktopSidebar',
  components: {
    Home,
    Calendar,
    User,
    Activity,
    Menu,
    X
  },
  emits: ['tab-change'],
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isCollapsed: false,
      tabs: [
        { id: 'home', label: 'Home', icon: 'Home' },
        { id: 'activities', label: 'Activities', icon: 'Activity' },
        { id: 'bookings', label: 'My Bookings', icon: 'Calendar' },
        { id: 'profile', label: 'Profile', icon: 'User' }
      ]
    };
  },
  methods: {
    tabButtonClasses(tabId) {
      const isActive = this.activeTab === tabId;
      const baseClasses = 'w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors';
      const activeClasses = 'bg-blue-50 text-blue-600';
      const inactiveClasses = 'text-gray-700 hover:bg-gray-100';
      
      return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    }
  }
};
</script>
