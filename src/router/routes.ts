export const routes = {
  home: {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  formExample: {
    path: '/form-example',
    name: 'form-example',
    component: () => import('../views/FormExample.vue')
  },
  virtualizationExample: {
    path: '/virtualization-example',
    name: 'virtualization-example',
    component: () => import('../views/VirtualizationExample.vue')
  },
  realtimeGraphExample: {
    path: '/realtime-graph-example',
    name: 'realtime-graph-example',
    component: () => import('../views/RealtimeGraphExample.vue')
  }
};

export const routesOrder = [
  routes.home.name,
  routes.formExample.name,
  routes.virtualizationExample.name,
  routes.realtimeGraphExample.name
];
