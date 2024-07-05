<script setup lang="ts">
import SlideContainer from '@/components/SlideContainer.vue';
import { routes } from '@/router/routes';
import SlideTitle from '@/components/SlideTitle.vue';
import {
  computed, onBeforeUnmount, reactive, ref
} from 'vue';
import { getAlertSocket } from '@/ws/alerts';
import Chart from 'primevue/chart';
import { formatDate } from '@vueuse/core';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

const xLabels = reactive<string[]>([]);
const yValues = reactive<(number | null)[]>([]);
const yLocal = reactive<(number | null)[]>([]);

const socket = getAlertSocket((alert) => {
  xLabels.push(formatDate(new Date(alert.timestamp), 'HH:mm:ss'));
  yValues.push(alert.data);
  yLocal.push(null);
});

const reportValue = ref();
const onAddReport = () => {
  if (reportValue.value != null) {
    xLabels.push(formatDate(new Date(), 'HH:mm:ss'));
    yLocal.push(reportValue.value);
    yValues.push(null);
    reportValue.value = null;
  }
};

const data = computed(() => ({
  labels: [...xLabels],
  datasets: [
    {
      label: 'Alerts',
      data: [...yValues],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      spanGaps: true
    },
    {
      label: 'Local',
      data: [...yLocal],
      fill: false,
      borderColor: 'rgb(192, 75, 192)',
      tension: 0.1,
      spanGaps: true
    }
  ]
}));

const options = {
  animation: {
    duration: 0
  },
  scales: {
    x: {
      ticks: {
        color: 'white'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    y: {
      ticks: {
        color: 'white'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  }
};

onBeforeUnmount(() => {
  socket.close();
});
</script>

<template>
  <SlideContainer :prev-link="routes.virtualizationExample">
    <div class="w-full max-w-[100vh] h-full p-10 flex flex-col gap-10">
      <SlideTitle>Realtime Graph</SlideTitle>
      <form class="flex gap-1">
        <InputNumber
          v-model="reportValue"
          @keydown.enter="onAddReport"
        />
        <Button @click="onAddReport">Report</Button>
      </form>
      <Chart
        type="line"
        :data="data"
        :options="options"
      />
    </div>
  </SlideContainer>
</template>
