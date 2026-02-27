<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <section class="card border border-base-300 bg-base-100 shadow-sm">
    <header class="card-body pb-2">
      <h2 class="card-title">{{ title }}</h2>
      <p v-if="description" class="text-sm text-base-content/70">{{ description }}</p>
    </header>
    <div class="card-body pt-0">
      <slot />
    </div>
  </section>
</template>
