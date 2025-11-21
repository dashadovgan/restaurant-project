import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/global.css';
import 'vue-tel-input/vue-tel-input.css';
import VueTelInput from 'vue-tel-input';

const app = createApp(App);

app.use(router);
app.use(VueTelInput, {
  mode: 'international',
  defaultCountry: 'UA',
});


app.mount('#app');