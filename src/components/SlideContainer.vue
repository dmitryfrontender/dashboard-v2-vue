<script setup lang="ts">
import Button from 'primevue/button';
import type { RouteLocationRaw } from 'vue-router';

withDefaults(defineProps<{
  nextLink?: RouteLocationRaw | null;
  prevLink?: RouteLocationRaw | null;
}>(), {
  nextLink: null,
  prevLink: null
});

</script>

<template>
  <main class="grid grid-cols-[50px_1fr_50px] justify-between items-center gap-4 h-full w-full p-4">
    <div class="flex items-center justify-start">
      <RouterLink
        v-if="prevLink"
        :to="prevLink"
        v-slot="{ navigate }"
        custom
      >
        <Button
          icon="pi pi-arrow-left"
          size="large"
          link
          rounded
          @click="navigate"
        />
      </RouterLink>
    </div>
    <div class="flex items-center justify-center h-full">
      <slot />
    </div>
    <div class="flex items-center justify-end">
      <RouterLink
        v-if="nextLink"
        :to="nextLink"
        v-slot="{ navigate }"
        custom
      >
        <Button
          icon="pi pi-arrow-right"
          size="large"
          link
          rounded
          @click="navigate"
        />
      </RouterLink>
    </div>
  </main>
</template>
