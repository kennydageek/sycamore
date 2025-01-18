import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import DynamicFormValidationPlugin from './plugins/validate';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(DynamicFormValidationPlugin);
app.use(router);

app.mount('#app');
