<template>
  <h1>Bienvenido, {{ username }}</h1>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore';
const userStore = useUserStore();
const { username } = userStore;
</script>