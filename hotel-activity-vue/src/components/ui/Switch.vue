<template>
  <button
    type="button"
    role="switch"
    :aria-checked="checked"
    :class="switchClasses"
    @click="toggle"
    v-bind="$attrs"
  >
    <span :class="thumbClasses"></span>
  </button>
</template>

<script>
import { cn } from '@/lib/utils.js';

export default {
  name: 'Switch',
  inheritAttrs: false,
  emits: ['update:checked'],
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    switchClasses() {
      return cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        this.checked 
          ? "bg-primary" 
          : "bg-input",
        this.className
      );
    },
    thumbClasses() {
      return cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
        this.checked 
          ? "translate-x-4" 
          : "translate-x-0"
      );
    }
  },
  methods: {
    toggle() {
      this.$emit('update:checked', !this.checked);
    }
  }
};
</script>
