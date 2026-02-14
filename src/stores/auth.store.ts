import { defineStore } from "pinia";
import { login } from "../api/auth.service"
import router from "@/router";

export const useAuthStore = defineStore("auth", {
   state: () => ({
    accessToken: null as string | null,
    refreshToken: null as string | null,
    user: null as any
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken
  },

  actions: {
    async login(userName: string, password: string) {
      const data = await login({ userName, password })

      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken

      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)

      router.push("/")
    },

    loadFromStorage() {
      this.accessToken = localStorage.getItem("accessToken")
      this.refreshToken = localStorage.getItem("refreshToken")
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      localStorage.clear()
      router.push("/login")
    }
  }
});
