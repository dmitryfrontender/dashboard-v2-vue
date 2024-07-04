<script setup lang="ts">
import SlideContainer from '@/components/SlideContainer.vue';
import { routes } from '@/router/routes';
import SlideTitle from '@/components/SlideTitle.vue';

</script>

<template>
  <SlideContainer :next-link="routes.formExample">
    <SlideTitle>Vue 3 Presentation</SlideTitle>
  </SlideContainer>
</template>
