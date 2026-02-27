<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store"

const auth = useAuthStore()


function logout() {
  auth.logout()
}
</script>

<template>
  <div class="drawer">

    <!-- Drawer Toggle -->
    <input id="main-drawer" type="checkbox" class="drawer-toggle" />

    <!-- Main Content -->
    <div class="drawer-content flex flex-col">

      <!-- Navbar -->
      <div class="navbar bg-base-100 shadow-sm">

        <div class="flex-none">
          <label for="main-drawer" class="btn btn-square btn-ghost">
            ☰
          </label>
        </div>

        <div class="flex-1">
          <span class="text-xl font-bold">Vaulty</span>
        </div>

        <div class="flex-none" v-if="auth.isAuthenticated">
          
          <button class="btn btn-error btn-sm" @click="logout">
            Çıkış
          </button>
        </div>

      </div>

      <!-- Router View -->
      <div class="p-4">
        <router-view />
      </div>

    </div>

    <!-- Sidebar -->
    <div class="drawer-side">
      <label for="main-drawer" class="drawer-overlay"></label>

      <ul class="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
        <li><router-link to="/">Dashboard</router-link></li>

        <li><router-link to="/videos">Vidolar</router-link></li>
        <li><router-link to="/files">Dosyalar</router-link></li>
        <li><router-link to="/machines">Makineler</router-link></li>
      </ul>

    </div>

  </div>
</template>
