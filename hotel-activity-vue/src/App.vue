<template>
  <!-- Auth Screen -->
  <AuthScreen
    v-if="!isAuthenticated && !isLoading"
    @auth-success="handleAuthSuccess"
  />

  <!-- Loading Screen -->
  <div
    v-else-if="isLoading"
    class="min-h-screen bg-gray-50 flex items-center justify-center"
  >
    <div class="text-center">
      <div class="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
        <Activity class="w-8 h-8 text-white" />
      </div>
      <p class="text-gray-600">Loading your experience...</p>
    </div>
  </div>

  <!-- Main App -->
  <div v-else :class="`min-h-screen bg-gray-50 ${isStaff ? 'theme-staff' : 'theme-guest'}`">
    <!-- Desktop Sidebar -->
    <DesktopSidebar
      v-if="!isMobile"
      :active-tab="currentTab"
      @tab-change="handleTabChange"
      @logout="handleLogout"
    />

    <!-- Main Content -->
    <div
      :class="`${
        isMobile ? 'pb-20' : 'ml-64'
      } transition-all duration-300`"
    >
      <div class="max-w-7xl mx-auto p-4 sm:p-6">
        <component
          :is="currentScreen"
          v-bind="screenProps"
          @navigate="handleNavigate"
          @activity-select="handleActivitySelect"
          @book-activity="handleBookActivity"
          @view-activity="handleActivitySelect"
          @back="handleBackToActivities"
          @book-time-slot="handleBookTimeSlot"
          @logout="handleLogout"
        />
      </div>
    </div>

    <!-- Mobile Bottom Navigation -->
    <MobileBottomNav
      v-if="isMobile"
      :active-tab="currentTab"
      @tab-change="handleTabChange"
    />

    <!-- Booking Confirmation Modal -->
    <BookingConfirmation
      v-if="showBookingConfirmation"
      @continue="showBookingConfirmation = false"
      @view-bookings="handleViewBookings"
    />
  </div>
</template>

<script>
import { useMobile } from '@/composables/useMobile.js';
import { useAuth } from '@/composables/useAuth.js';
import MobileBottomNav from '@/components/navigation/MobileBottomNav.vue';
import DesktopSidebar from '@/components/navigation/DesktopSidebar.vue';
import AuthScreen from '@/components/screens/AuthScreen.vue';
import HomeScreen from '@/components/screens/HomeScreen.vue';
import ActivitiesScreen from '@/components/screens/ActivitiesScreen.vue';
import ActivityDetailScreen from '@/components/screens/ActivityDetailScreen.vue';
import BookingsScreen from '@/components/screens/BookingsScreen.vue';
import ProfileScreen from '@/components/screens/ProfileScreen.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import { Check, Calendar, Activity } from 'lucide-vue-next';

// Booking Confirmation Modal Component
const BookingConfirmation = {
  name: 'BookingConfirmation',
  components: { Card, Button, Check, Calendar },
  emits: ['continue', 'view-bookings'],
  template: `
    <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card class="max-w-md w-full p-6 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check class="w-8 h-8 text-green-600" />
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p class="text-gray-600 mb-6">
          Your activity has been successfully booked. You'll receive a confirmation email shortly.
        </p>
        <div class="flex space-x-3">
          <Button
            variant="outline"
            class="flex-1"
            @click="$emit('continue')"
          >
            Continue Browsing
          </Button>
          <Button
            class="flex-1"
            @click="$emit('view-bookings')"
          >
            <Calendar class="w-4 h-4 mr-2" />
            View Bookings
          </Button>
        </div>
      </Card>
    </div>
  `
};

export default {
  name: 'App',
  components: {
    MobileBottomNav,
    DesktopSidebar,
    AuthScreen,
    HomeScreen,
    ActivitiesScreen,
    ActivityDetailScreen,
    BookingsScreen,
    ProfileScreen,
    BookingConfirmation,
    Activity
  },
  setup() {
    const { isMobile } = useMobile();
    const { 
      isAuthenticated, 
      isLoading, 
      signOut, 
      initializeAuth,
      isStaff
    } = useAuth();
    
    // Inicializar autenticación al montar el componente
    initializeAuth();
    
    return { 
      isMobile, 
      isAuthenticated, 
      isLoading, 
      signOut,
      isStaff
    };
  },
  data() {
    return {
      currentTab: 'home',
      selectedActivityId: null,
      showActivityDetail: false,
      showBookingConfirmation: false,
      lastBookedActivity: null
    };
  },
  computed: {
    currentScreen() {
      if (this.showActivityDetail && this.selectedActivityId) {
        return 'ActivityDetailScreen';
      }

      switch (this.currentTab) {
        case 'home':
          return 'HomeScreen';
        case 'activities':
          return 'ActivitiesScreen';
        case 'bookings':
          return 'BookingsScreen';
        case 'profile':
          return 'ProfileScreen';
        default:
          return 'HomeScreen';
      }
    },
    screenProps() {
      const props = {};
      
      if (this.currentScreen === 'ActivityDetailScreen') {
        props.activityId = this.selectedActivityId;
      } else if (this.currentScreen === 'ActivitiesScreen') {
        props.selectedActivityId = this.selectedActivityId;
      }
      
      return props;
    }
  },
  methods: {
    handleTabChange(tab) {
      this.currentTab = tab;
      this.showActivityDetail = false;
      this.selectedActivityId = null;
    },
    handleNavigate(tab, activityId) {
      this.currentTab = tab;
      if (activityId) {
        this.selectedActivityId = activityId;
        if (tab === 'activities') {
          this.showActivityDetail = true;
        }
      }
    },
    handleActivitySelect(activityId) {
      this.selectedActivityId = activityId;
      this.showActivityDetail = true;
    },
    handleBookActivity(activityId) {
      this.selectedActivityId = activityId;
      this.showActivityDetail = true;
    },
    handleBookTimeSlot(activityId, timeSlotId) {
      this.lastBookedActivity = activityId;
      this.showBookingConfirmation = true;
      this.showActivityDetail = false;
    },
    handleBackToActivities() {
      this.showActivityDetail = false;
      this.selectedActivityId = null;
    },
    async handleLogout() {
      const result = await this.signOut();
      if (result.success) {
        this.currentTab = 'home';
        this.selectedActivityId = null;
        this.showActivityDetail = false;
      }
    },
    
    handleAuthSuccess() {
      // El usuario se ha autenticado exitosamente
      console.log('User authenticated successfully');
    },
    handleViewBookings() {
      this.showBookingConfirmation = false;
      this.handleTabChange('bookings');
    }
  }
};
</script>