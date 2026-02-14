<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "@/stores/auth.store"

const authStore = useAuthStore()

const userName = ref("")
const password = ref("")
const loading = ref(false)
const error = ref("")

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ""
    await authStore.login(userName.value, password.value)
  } catch (err: any) {
    error.value = "Login failed"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300">
    <div class="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
      <div class="card-body space-y-4">

        <!-- Title -->
        <div class="text-center space-y-1">
          <h1 class="text-3xl font-bold tracking-tight">
            Vaultly
          </h1>
          <p class="text-sm text-base-content/60">
            Secure file & video management
          </p>
        </div>

        <!-- Error -->
        <div v-if="error" class="alert alert-error">
          <span>{{ error }}</span>
        </div>

        <!-- Email -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">UserName</span>
          </label>
          <input v-model="userName" type="text" placeholder="userName" class="input input-bordered w-full" />
        </div>

        <!-- Password -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input v-model="password" type="password" placeholder="••••••••" class="input input-bordered w-full" />
        </div>

        <!-- Button -->
        <button @click="handleLogin" class="btn btn-primary w-full" :class="{ loading: loading }" :disabled="loading">
          Sign In
        </button>

      </div>
    </div>
  </div>
</template>
