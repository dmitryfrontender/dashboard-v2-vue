<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import ProgressBar from 'primevue/progressbar';
import Column from 'primevue/column';
import Button from 'primevue/button';
import DataTable, { type DataTableRowEditSaveEvent } from 'primevue/datatable';
import { USERS_PER_PAGE, useUserStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import type { VirtualScrollerLazyEvent } from 'primevue/virtualscroller';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';

const PRELOAD_NUMBER = 20;

const userStore = useUserStore();
const { users, isUpdating } = storeToRefs(userStore);

const toast = useToast();

const loading = ref(false);
const currentPage = ref(0);
const isFinalPage = ref(false);

const editingRows = ref([]);

const onRowEditSave = async (event: DataTableRowEditSaveEvent) => {
  const user = await userStore.updateUser(event.newData);
  toast.add({
    severity: 'success',
    summary: 'User Updated',
    detail: `${user.firstName} ${user.lastName}`,
    life: 1000
  });
};

const onLazyLoad = async (event: VirtualScrollerLazyEvent) => {
  const { last } = event;

  const pageNum = currentPage.value;

  if (last < pageNum * USERS_PER_PAGE - PRELOAD_NUMBER || isFinalPage.value) return;

  loading.value = true;
  try {
    const newUsers = await userStore.loadPage(currentPage.value);
    if (pageNum < currentPage.value) return;
    isFinalPage.value = newUsers.length === 0;
    currentPage.value = pageNum + 1;
  } catch {
    // ignore throttle error
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-full h-full">
    <ProgressBar
      v-if="loading"
      mode="indeterminate"
      class="h-1 rounded-none"
    />
    <div
      v-else
      class="h-1"
    />
    <DataTable
      resizable-columns
      reorderable-columns
      scrollable
      scroll-height="flex"
      striped-rows
      data-key="id"
      edit-mode="row"
      v-model:editing-rows="editingRows"
      :value="users"
      :totalRecords="users.length"
      :row-class="({ optimistic }) => ['h-[80px]', { 'bg-yellow-800': optimistic }]"
      :pt="{
        wrapper: {
          class: '',
        },
        headerRow: {
          class: 'shadow-md pt-0',
        },
      }"
      :virtual-scroller-options="{
        id: 'id',
        itemSize: 80,
        lazy: true,
        loading: isUpdating,
        onLazyLoad,
        numToleratedItems: 5,
      }"
      @row-edit-save="onRowEditSave"
    >
      <Column
        field="id"
        class="w-1/5"
      >
        <template #header>
          <span class="text-yellow-400">#ID</span>
        </template>
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton
              width="60%"
              height="1rem"
            />
          </div>
        </template>
      </Column>
      <Column
        field="firstName"
        header="First Name"
        class="w-1/5"
      >
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton
              width="60%"
              height="1rem"
            />
          </div>
        </template>
        <template #editor="{ data, field }">
          <InputText
            type="text"
            size="small"
            v-model="data[field]"
          />
        </template>
      </Column>
      <Column
        field="lastName"
        header="Last Name"
        class="w-1/5"
      >
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton
              width="60%"
              height="1rem"
            />
          </div>
        </template>
        <template #editor="{ data, field }">
          <InputText
            type="text"
            size="small"
            v-model="data[field]"
          />
        </template>
      </Column>
      <Column
        field="contact.email"
        header="Email"
        class="w-1/5"
      >
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton
              width="60%"
              height="1rem"
            />
          </div>
        </template>
      </Column>
      <Column
        row-editor
        class="w-1/12"
      />
      <Column class="w-1/12">
        <template #body="{ data }">
          <Button
            size="small"
            icon="pi pi-trash"
            severity="danger"
            @click="userStore.deleteUser(data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
