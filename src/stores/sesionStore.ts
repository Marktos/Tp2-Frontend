import type { SesionState } from "@/models/sesionModel";
import { defineStore } from "pinia";

export const useSesionStore = defineStore('sesion', {
    state: (): SesionState => ({
    loading: false,
    data: JSON.parse(localStorage.getItem('sesionKey') || 'null')
    }),
    actions: {
    update(payload: string) {
        this.loading = true

        const updatedPayload = payload.split('.')[1]

        const createAt = new Date()
        const expiresAt = new Date(Date.now() + 150 * 1000) 
        const refreshAt = new Date(Date.now() + 150 * 1000 - 120 * 1000) 

        setTimeout(() => {
            this.data = {
            tokenPayload: updatedPayload,
            createAt,
            refreshAt,
            expiresAt
        }
        this.loading = false
        },)
    },
    remove() {
        this.data = null
        localStorage.removeItem('sesionKey')
    }
}
})