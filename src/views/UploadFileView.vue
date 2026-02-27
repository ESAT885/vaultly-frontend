<script setup lang="ts">
import { onMounted } from "vue"

import { useFileStore } from "@/stores/file.store"

const fileStore = useFileStore()

function handleUpload(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  if (input.files[0] == null)
    return
  fileStore.uploadFile(input.files[0])
}



onMounted(() => {
  fileStore.fetchFiles()
})
</script>

<template>
  <div class="p-8 space-y-6">

    <h1 class="text-2xl font-bold">Dosya Yükle</h1>

    <label class="btn btn-primary">
      Dosya Seç
      <input type="file" hidden @change="handleUpload" />
    </label>

    <div v-if="fileStore.uploading" class="space-y-2">
      <progress class="progress progress-primary w-full" :value="fileStore.progress" max="100"></progress>

      <p class="text-sm">{{ fileStore.progress }}%</p>
    </div>

  </div>
  <div class="p-8">

    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">
        Dosyalar ({{ fileStore.fileCount }})
      </h1>

      <button class="btn btn-outline btn-sm" @click="fileStore.fetchFiles()">
        Yenile
      </button>
    </div>

    <div v-if="fileStore.filesloading">
      Yükleniyor...
    </div>

    <div v-else-if="fileStore.fileserror">
      {{ fileStore.fileserror }}
    </div>

    <div v-else class="grid md:grid-cols-3 gap-4">

      <div v-for="file in fileStore.files" :key="file.id" class="card bg-base-100 shadow-md">
        <div class="card w-full bg-base-100 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
 <div class="card-body">

          <h2 class="card-title text-sm truncate">
            {{ file.originalFileName }}
          </h2>
          <button  class="btn btn-primary btn-sm mt-2" @click="fileStore.downloadFile(file.id)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
      </svg>
            Download
          </button>

          <div v-if="fileStore?.downloading">
            Download: %{{ fileStore?.downloadProgress }}
          </div>




        </div>
        </div>

      </div>

    </div>

  </div>

</template>
