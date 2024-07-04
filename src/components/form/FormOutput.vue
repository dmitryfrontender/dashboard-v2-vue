<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';

const formatErrors = (errors: ErrorObject[]) => errors.map((error) => error.$message).join(', ');

withDefaults(defineProps<{
  errors?: ErrorObject[],
  value?: string,
}>(), {
  // For non primitive values getter required
  errors: () => [],
  value: ''
});
</script>

<template>
  <span
    v-if="errors.length"
    class="text-red-600 text-sm"
  >{{ formatErrors(errors) }}</span>
  <template v-else-if="value">
    {{ value }}
  </template>
  <span
    v-else
    class="text-yellow-300"
  >
    empty
  </span>
</template>

<style scoped>

</style>
