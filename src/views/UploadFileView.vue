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
            <input type="file" hidden  @change="handleUpload" />
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

      <button
        class="btn btn-outline btn-sm"
        @click="fileStore.fetchFiles()"
      >
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

      <div
        v-for="file in fileStore.files"
        :key="file.id"
        class="card bg-base-100 shadow-md"
      >
        <div class="card-body">

          <h2 class="card-title text-sm truncate">
            {{ file.originalFileName }}
          </h2>
       <button @click="fileStore.downloadFile(file.id)">
  Download
</button>

<div v-if="fileStore?.downloading">
  Download: %{{ fileStore?.downloadProgress }}
</div>

       


        </div>
      </div>

    </div>

  </div>

</template>
