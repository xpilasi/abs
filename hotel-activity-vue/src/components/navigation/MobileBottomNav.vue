<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
    <div class="flex items-center justify-around px-4 py-2 safe-area-bottom">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="tabClasses(tab.id)"
        @click="$emit('tab-change', tab.id)"
      >
        <component :is="tab.icon" class="w-5 h-5 mb-1" />
        <span class="text-xs leading-none">{{ tab.label }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { Home, Calendar, User, Activity } from 'lucide-vue-next';

export default {
  name: 'MobileBottomNav',
  components: {
    Home,
    Calendar,
    User,
    Activity
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
      tabs: [
        { id: 'home', label: 'Home', icon: 'Home' },
        { id: 'activities', label: 'Activities', icon: 'Activity' },
        { id: 'bookings', label: 'My Bookings', icon: 'Calendar' },
        { id: 'profile', label: 'Profile', icon: 'User' }
      ]
    };
  },
  methods: {
    tabClasses(tabId) {
      const isActive = this.activeTab === tabId;
      const baseClasses = 'flex flex-col items-center justify-center p-2 min-w-0 flex-1';
      const activeClasses = 'text-blue-600';
      const inactiveClasses = 'text-gray-500 hover:text-gray-700';
      
      return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    }
  }
};
</script>
