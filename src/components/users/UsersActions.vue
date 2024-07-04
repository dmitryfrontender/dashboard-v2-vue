<script setup lang="ts">
import Button from 'primevue/button';
import { generateUser, useUserStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const onAddUser = async () => {
  const realUser = await userStore.createUser(generateUser(true));
  toast.add({
    severity: 'success',
    summary: 'User Added',
    detail: `${realUser.firstName} ${realUser.lastName}`,
    life: 3000
  });
};
</script>

<template>
  <div class="flex gap-4 items-center justify-end">
    {{ users.length }} users
    <Button
      icon="pi pi-plus"
      label="Add User"
      size="small"
      class="text-white"
      @click="onAddUser"
    />
  </div>
</template>

<style scoped>

</style>
