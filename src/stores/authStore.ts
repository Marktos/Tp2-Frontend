import { fetchWrapper } from "@/helpers/FetchWrappers";
import { useSesionStore } from "./sesionStore";
import type { User } from "@/models/UserModel";
import { defineStore } from "pinia";
import router from "@/router";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        auth: {} as { loading: boolean, data?: User | null, refreshTokenTimeout: number | null}
    }),
    actions: {
        async login(username: string, password:string){
            this.auth.data = await fetchWrapper.post(`${baseUrl}/authenticate`, {username, password}, {credentials: 'include'})
            const sesionStor = useSesionStore()
            if (this.auth.data?.jwtToken) {
                sesionStor.update(this.auth.data?.jwtToken)
            }
            this.startRefreshTokenTimer()
        },
        logout() {
            fetchWrapper.post(`${baseUrl}/revoke-token`, {}, {credentials: 'include'})
            this.stopRefreshTokenTimer()
            this.auth.data = null;
            router.push({ path: '/login'})
        },
        async refreshToken() {
            this.auth.data = await fetchWrapper.post(`${baseUrl}/refresh-token`, {}, {credentials: 'include'})
            const sesionStor = useSesionStore()
            if (this.auth.data?.jwtToken) {
                sesionStor.update(this.auth.data?.jwtToken)
            }
            this.startRefreshTokenTimer()
        },
        startRefreshTokenTimer() {
            if (!this.auth.data || !this.auth.data.jwtToken) return;

            //Parseamos un objeto JSON de Base64
            const jwtBase64 = this.auth.data.jwtToken.split('.')[1]
            const decodecJwtToken = JSON.parse(atob(jwtBase64));

            //Create timeout to refresh token before this expire
            const expires = new Date(decodecJwtToken.exp * 1000)
            const timeout = expires.getTime() - Date.now() - (60 * 1000)

            this.auth.refreshTokenTimeout = setTimeout(this.refreshToken, timeout)
        },
        stopRefreshTokenTimer() {
            if (this.auth.refreshTokenTimeout) {
                clearTimeout(this.auth.refreshTokenTimeout);
                this.auth.refreshTokenTimeout = null;
            }
        }
    }
})