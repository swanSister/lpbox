import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'
import store from './store'
import VCalendar from 'v-calendar'
import Datepicker from "vue3-datepicker";
import 'v-calendar/style.css'
import mitt from 'mitt'
const app = createApp(App);
const emitter = mitt()

app.use(router); 
app.use(store);
app.use(VCalendar, {});
app.component('Datepicker', Datepicker)
app.config.globalProperties.emitter = emitter

app.mount('#app');
