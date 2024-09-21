<script setup lang="ts">
  import { computed, defineProps, withDefaults, useSlots } from "vue";
  export declare interface FesButtonProps {
    variant?: "default" | "accent" | "info" | "success" | "warning" | "error";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    text?: boolean;
    block?: boolean;
    loading?: boolean;
    secondary?: boolean;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<FesButtonProps>(), {
    variant: () => "default",
    size: () => "md",
    text: false,
    block: false,
    loading: false,
    secondary: false,
    disabled: false,
  });
  const slots = useSlots();
  const hasPrependedSlot = computed(() => slots["prepend-icon"]);
  const hasAppendedSlot = computed(() => slots["append-icon"]);
  const classes = computed(() => [
    `app-btn-${props.variant}`,
    `app-btn-${props.size}`,
    props.text ? `is-text` : ``,
    props.secondary ? `is-secondary` : ``,
    props.block ? `flex justify-center w-full` : `inline-flex items-center`,
    props.loading && !props.text ? `is-loading` : `is-not-loading`,
  ]);
</script>

<template>
  <button type="button" class="app-btn" :class="classes" :disabled="disabled">
    <span v-if="props.loading && !props.text" class="-ml-1 mr-3 size-5">
      <svg
        class="animate-spin text-inherit"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
    <span v-else-if="hasPrependedSlot && !props.text" class="-ml-1 mr-2 size-5">
      <slot name="prepend-icon" />
    </span>
    <slot />
    <span v-if="hasAppendedSlot && !props.text" class="-mr-1 ml-2 size-5">
      <slot name="append-icon" />
    </span>
  </button>
</template>

<!-- suppress CssUnusedSymbol -->
<style scoped>
  .app-btn {
    @apply items-center rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
  }

  .app-btn:not(.is-text) {
    @apply border shadow-sm;
  }

  .app-btn.is-text {
    @apply !bg-transparent ring-0;
  }

  .app-btn.is-loading {
    @apply pointer-events-none cursor-not-allowed;
  }

  .app-btn.is-not-loading {
    @apply disabled:!pointer-events-none disabled:!cursor-not-allowed disabled:!border-gray-200 disabled:!bg-gray-50 disabled:!text-gray-500;
  }

  .app-btn.app-btn-default:not(.is-text):not(.is-secondary) {
    @apply border-gray-300 bg-white text-gray-700 hover:bg-gray-50;
  }

  .app-btn.app-btn-default.is-secondary {
    @apply border-gray-400 bg-white text-gray-700 hover:bg-gray-200;
  }

  .app-btn.app-btn-default.is-text {
    @apply text-gray-600 hover:text-gray-500;
  }

  .app-btn.app-btn-accent:not(.is-text):not(.is-secondary) {
    @apply border-transparent bg-indigo-600 text-white hover:bg-indigo-700;
  }

  .app-btn.app-btn-accent.is-secondary {
    @apply border-indigo-600 bg-indigo-100 text-indigo-600 hover:bg-indigo-200;
  }

  .app-btn.app-btn-accent.is-text {
    @apply text-indigo-600 hover:text-indigo-500;
  }

  .app-btn.app-btn-accent.is-loading:not(.is-text) {
    @apply bg-indigo-400;
  }

  .app-btn.app-btn-info:not(.is-text):not(.is-secondary) {
    @apply border-transparent bg-blue-600 text-white hover:bg-blue-700;
  }

  .app-btn.app-btn-info.is-secondary {
    @apply border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100;
  }

  .app-btn.app-btn-info.is-text {
    @apply text-blue-600 hover:text-blue-500;
  }

  .app-btn.app-btn-info.is-loading:not(.is-text) {
    @apply bg-blue-400;
  }

  .app-btn.app-btn-success:not(.is-text):not(.is-secondary) {
    @apply border-transparent bg-green-600 text-white hover:bg-green-700;
  }

  .app-btn.app-btn-success.is-secondary {
    @apply border-green-600 bg-green-50 text-green-600 hover:bg-green-100;
  }

  .app-btn.app-btn-success.is-text {
    @apply text-green-600 hover:text-green-500;
  }

  .app-btn.app-btn-success.is-loading:not(.is-text) {
    @apply bg-green-400;
  }

  .app-btn.app-btn-warning:not(.is-text):not(.is-secondary) {
    @apply border-transparent bg-yellow-600 text-white hover:bg-yellow-700;
  }

  .app-btn.app-btn-warning.is-secondary {
    @apply border-yellow-600 bg-yellow-50 text-yellow-600 hover:bg-yellow-100;
  }

  .app-btn.app-btn-warning.is-text {
    @apply text-yellow-600 hover:text-yellow-500;
  }

  .app-btn.app-btn-warning.is-loading:not(.is-text) {
    @apply bg-yellow-400;
  }

  .app-btn.app-btn-error:not(.is-text):not(.is-secondary) {
    @apply border-transparent bg-red-600 text-white hover:bg-red-700;
  }

  .app-btn.app-btn-error.is-secondary {
    @apply border-red-600 bg-red-50 text-red-600 hover:bg-red-100;
  }

  .app-btn.app-btn-error.is-text {
    @apply text-red-600 hover:text-red-500;
  }

  .app-btn.app-btn-error.is-loading:not(.is-text) {
    @apply bg-red-400;
  }

  .app-btn.app-btn-xs {
    @apply text-xs;
  }

  .app-btn.app-btn-xs:not(.is-text),
  .app-btn.app-btn-xs.is-text.is-secondary {
    @apply px-2.5 py-1.5;
  }

  .app-btn.app-btn-sm {
    @apply text-sm leading-4;
  }

  .app-btn.app-btn-sm:not(.is-text),
  .app-btn.app-btn-sm.is-text.is-secondary {
    @apply px-3 py-2;
  }

  .app-btn.app-btn-md {
    @apply text-sm;
  }

  .app-btn.app-btn-md:not(.is-text),
  .app-btn.app-btn-md.is-text.is-secondary {
    @apply px-4 py-2;
  }

  .app-btn.app-btn-lg {
    @apply text-base;
  }

  .app-btn.app-btn-lg:not(.is-text),
  .app-btn.app-btn-lg.is-text.is-secondary {
    @apply px-4 py-2;
  }

  .app-btn.app-btn-xl {
    @apply text-base;
  }

  .app-btn.app-btn-xl:not(.is-text),
  .app-btn.app-btn-xl.is-text.is-secondary {
    @apply px-6 py-3;
  }
</style>
