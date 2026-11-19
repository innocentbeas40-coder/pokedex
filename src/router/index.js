import { createRouter, createWebHistory } from 'vue-router'
// Importa la página de inicio de sesión.
import PokemonView from '../views/PokemonView.vue'

const routes = [

    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: PokemonView
    }
]

// Crea el sistema de navegación de Vue.
const router = createRouter({
    // Permite navegar con direcciones normales,
    // como /login y /dashboard, sin utilizar #.
    history: createWebHistory(),

    // se indica al router qué páginas debe manejar.
    routes
})

// Exporta el router para utilizarlo en main.js.
export default router