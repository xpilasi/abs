<template>
  <div
    :class="cardClasses"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { cn } from '@/lib/utils.js';

export default {
  name: 'Card',
  inheritAttrs: false,
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    cardClasses() {
      return cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        this.className
      );
    }
  }
};
</script>
