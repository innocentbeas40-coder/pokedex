import { createApp } from 'vue'
import App from './App.vue'

// Importa estilos SCSS.
import './assets/scss/main.scss'

// Importa configuración Router.
import router from './router'

// Crea aplicación activa la navegación
// se monta en el elemento #app del HTML.
createApp(App)
  .use(router)
  .mount('#app')