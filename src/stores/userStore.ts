import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
  }),
  actions: {
    setUser(user: { username: string }) {
      this.username = user.username;
    },
  },
});
