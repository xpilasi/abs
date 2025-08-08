<template>
  <div :class="avatarClasses">
    <img
      v-if="src && !imageError"
      :src="src"
      :alt="alt"
      :class="imageClasses"
      @error="imageError = true"
    />
    <div
      v-else
      :class="fallbackClasses"
    >
      <slot>
        {{ fallbackText }}
      </slot>
    </div>
  </div>
</template>

<script>
import { cn } from '@/lib/utils.js';

export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    fallback: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageError: false
    };
  },
  computed: {
    avatarClasses() {
      return cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        this.className
      );
    },
    imageClasses() {
      return "aspect-square size-full object-cover";
    },
    fallbackClasses() {
      return "bg-muted flex size-full items-center justify-center rounded-full";
    },
    fallbackText() {
      return this.fallback || this.alt.slice(0, 2).toUpperCase();
    }
  },
  watch: {
    src() {
      this.imageError = false;
    }
  }
};
</script>
