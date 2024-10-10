import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'
import { fakeBackend } from './helpers/fakebackend'

//importo los estilos globales
import './assets/global.css'

import App from './App.vue'
import router from './router'

fakeBackend()
startApp()

async function startApp() {
    const app = createApp(App)

    app.use(createPinia())
    app.use(router)

    try {
        const authStore = useAuthStore()
        await authStore.refreshToken()
    } catch (error) {
        console.warn('No hay datos de autenticacion para el usuario')
        console.info('Redirigiendo a login page')
        router.push('/login')
    }

    app.mount('#app')
}
