import './assets/main.scss';
import 'primevue/resources/themes/lara-dark-green/theme.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from './App.vue';
import { router } from './router/router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: true, inputStyle: 'filled' });
app.use(ToastService);

app.mount('#app');
