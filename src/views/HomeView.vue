<!-- <script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useSesionStore } from '@/stores/sesionStore';
import { useUserStore } from '@/stores/userStore';

const authStore = useAuthStore();

const userStore = useUserStore();

// Obtener el listado de usuarios
const user = useUserStore.getUsers();

// Función para formatear fechas
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }).format(new Date(date));
};


const addUser = () => {
  console.log('Agregar Usuario clicked');
};

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <div class="home-container">
    <h1>Hola, {{ user.firstName }}</h1>
    <div class="info">
      <h3>Información de tu usuario:</h3>
      <p>Nombre: {{ user.firstName }} {{ user.lastName }}</p>
      <p>Rol: {{ user.isAdmin ? 'Administrador' : 'Usuario' }}</p>

      <h3>Información de sesión:</h3>
      <p>JWT Payload: {{ sesion.data.payload }}</p>
      <p>JWT Creado a las: {{ formatDate(sesion.data.createdAt) }}</p>
      <p>JWT Expira las: {{ formatDate(sesion.data.expiresAt) }}</p>
      <p>JWT se refrescara a las: {{ formatDate(session.data.refreshAt) }}</p>

      <h3>Lista de usuarios:</h3>
      <ul>
        <li v-for="u in users" :key="u.id">
          {{ u.firstName }} {{ u.lastName }} [{{ u.isAdmin ? 'Administrador' : 'Usuario' }}]
        </li>
      </ul>

      <!- Botón solo visible para administradores -->
      <!-- <button v-if="user.isAdmin" @click="addUser" class="add-user-button">
        + Agregar Nuevo
      </button>

      <! Botón de Logout visible para todos -->
      <!-- <button @click="logout" class="logout-button">Salir</button>
    </div>
  </div>
</template> -->
<!-- 
<style scoped>
/* Añade estilos para el botón "Agregar Usuario" */
.add-user-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.logout-button {
  background-color: #f87171;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}
</style> --> --> -->

<script setup lang="ts">
  import { useUserStore } from '../stores/userStore';
  import { useAuthStore } from '@/stores/authStore';
  import { useSesionStore } from '@/stores/sesionStore';
  import type { User } from '@/models/UserModel';

  const userStore = useUserStore();
  const authStore = useAuthStore()
  const sesionStore = useSesionStore();
  const user = authStore.auth.data as User

// Función para formatear fechas
function formatDate(hora: Date | number) {
  const date = new Date(hora)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}` // Formatear la hora
}





  function logout() {
    authStore.logout()
  }

</script>

<template>
  <div class="wrapper">
    <h1>Bienvenido, {{ user.firstName }}</h1>
    
    <div class="space"></div>

    <div>
      <h3>Información de tu usuario:</h3>
      <p>Nombre: {{ user.firstName }} {{ user.lastName }}</p>
      <p>Rol: {{ user.isAdmin ? 'Administrador' : 'Usuario' }}</p>
    </div>

    <div class="space"></div>
    <span></span>
    <div>
      <h3>Información de sesión:</h3>
      <p>JWT Payload: <span>{{ sesionStore.data?.tokenPayload }}</span></p>
      <p>JWT Creado a las: <span>{{ formatDate(sesionStore.data?.createAt!) }}</span></p>
      <p>JWT Expira las: <span>{{ formatDate(sesionStore.data?.expiresAt!) }}</span></p>
      <p>JWT se refrescara a las: <span>{{ formatDate(sesionStore.data?.refreshAt!) }}</span></p>
    </div>

    <div class="space"></div>

    <div>
      <h3>Lista de usuarios:</h3>
      <ul>
        <li v-for="user in userStore.usuarios" :key="user.id">
          {{ user.firstName }} {{ user.lastName }} [{{ user.isAdmin ? 'Administrador' : 'Usuario' }}]
        </li>
      </ul>
    </div>

    <button @click="logout">Log Out</button>
  </div>
</template>


<style scoped>
.wrapper {
    width: 400px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .2);
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    color: #fff;
    padding: 30px 40px;
    border-radius: 15px;
}

h1 {
    font-size: 3em;
    font-weight: 500;
    text-align: center;
}
h3 {
    font-size: 2em;
    font-weight: 500;
    text-align: center;
}
</style>



