<script setup lang="ts">
  import { useUserStore } from '../stores/userStore';
  import { useAuthStore } from '@/stores/authStore';

  const userStore = useUserStore();
  const { username } = userStore;

  const authStore = useAuthStore()
  function logout() {
    authStore.logout()
  }

</script>

<template>
  <div class="wrapper">
    <h1>Bienvenido, {{ username }}</h1>
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

.wrapper h1 {
    font-size: 3em;
    text-align: center;
}
</style>