
import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './roteador'

createApp(App)
    .use(router)    
    .mount('#app')