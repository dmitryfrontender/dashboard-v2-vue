import { createRouter, createWebHistory } from 'vue-router';
import { routes, routesOrder } from '@/router/routes';
import { ref } from 'vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routes)
});

export const routeTransition = ref('');

router.beforeEach((to, from) => {
  if (!from.name) return;
  const toIndex = routesOrder.indexOf(to.name as string);
  const fromIndex = routesOrder.indexOf(from.name as string);

  if (toIndex === fromIndex) {
    routeTransition.value = '';
  }
  routeTransition.value = toIndex > fromIndex ? 'slide-right' : 'slide-left';
});
