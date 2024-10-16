import { defineStore } from 'pinia';
import type { UserState, User } from '@/models/UserModel';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    usuarios: JSON.parse(localStorage.getItem('vue-3-jwt-refresh-token-users') || ''),
  }),
   actions: {
    setUsers(users: User[]): void {
      this.usuarios = users
    }
  }
});
