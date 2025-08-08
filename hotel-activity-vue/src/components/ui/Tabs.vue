<template>
  <div :class="tabsClasses">
    <div :class="tabsListClasses">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="tabTriggerClasses(tab.value)"
        @click="selectTab(tab.value)"
      >
        <slot name="tab" :tab="tab">
          {{ tab.label }}
        </slot>
      </button>
    </div>
    
    <div
      v-for="tab in tabs"
      :key="`content-${tab.value}`"
      v-show="activeTab === tab.value"
      :class="tabContentClasses"
    >
      <slot :name="`content-${tab.value}`" :tab="tab">
        {{ tab.content }}
      </slot>
    </div>
  </div>
</template>

<script>
import { cn } from '@/lib/utils.js';

export default {
  name: 'Tabs',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    tabs: {
      type: Array,
      required: true,
      validator: (tabs) => tabs.every(tab => tab.value && tab.label)
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    activeTab() {
      return this.modelValue || (this.tabs.length > 0 ? this.tabs[0].value : '');
    },
    tabsClasses() {
      return cn("flex flex-col gap-2", this.className);
    },
    tabsListClasses() {
      return "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex";
    },
    tabContentClasses() {
      return "flex-1 outline-none";
    }
  },
  methods: {
    selectTab(value) {
      this.$emit('update:modelValue', value);
    },
    tabTriggerClasses(value) {
      const baseClasses = "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
      
      const activeClasses = "bg-card dark:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:border-input dark:bg-input/30";
      
      const inactiveClasses = "text-foreground dark:text-muted-foreground";
      
      return cn(
        baseClasses,
        this.activeTab === value ? activeClasses : inactiveClasses
      );
    }
  }
};
</script>
