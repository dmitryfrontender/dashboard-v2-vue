<script setup lang="ts">
import SlideContainer from '@/components/SlideContainer.vue';
import { routes } from '@/router/routes';
import SlideTitle from '@/components/SlideTitle.vue';

import UsersActions from '@/components/users/UsersActions.vue';
import UsersTable from '@/components/users/UsersTable.vue';
</script>

<template>
  <SlideContainer
    :prev-link="routes.formExample"
    :next-link="routes.realtimeGraphExample"
  >
    <div class="w-full h-full p-10 flex flex-col gap-10">
      <SlideTitle>Table & Virtualization</SlideTitle>
      <h6 class="text-center">(Columns are resizable and reorderable)</h6>
      <UsersActions />
      <UsersTable />
    </div>
  </SlideContainer>
</template>
