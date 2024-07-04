<script setup lang="ts">
import { RouterView } from 'vue-router';
import { routeTransition } from '@/router/router';
import Toast from 'primevue/toast';

</script>
<template>
  <Toast position="bottom-left" />
  <Toast
    position="top-center"
    group="error"
  />
  <RouterView v-slot="{ Component, route }">
    <Transition :name="routeTransition">
      <component
        :is="Component"
        :key="route.path"
      />
    </Transition>
  </RouterView>
</template>
