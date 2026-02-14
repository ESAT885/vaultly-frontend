<script setup lang="ts">
import { onMounted } from "vue"
import { useVideoStore } from "@/stores/video.store"

const videoStore = useVideoStore()

function handleUpload(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  if (input.files[0] == null)
    return
  videoStore.uploadVideo(input.files[0])
}


onMounted(() => {
  videoStore.fetchVideos()
})
</script>

<template>
  <div class="p-8 space-y-6">

    <h1 class="text-2xl font-bold">Video Yükle</h1>

    <label class="btn btn-primary">
      Video Seç
      <input type="file" hidden accept="video/*" @change="handleUpload" />
    </label>

    <div v-if="videoStore.uploading" class="space-y-2">
      <progress class="progress progress-primary w-full" :value="videoStore.progress" max="100"></progress>

      <p class="text-sm">{{ videoStore.progress }}%</p>
    </div>

  </div>
  <div class="p-8">

    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">
        Videolar ({{ videoStore.videoCount }})
      </h1>

      <button class="btn btn-outline btn-sm" @click="videoStore.fetchVideos()">
        Yenile
      </button>
    </div>

    <div v-if="videoStore.videosloading">
      Yükleniyor...
    </div>

    <div v-else-if="videoStore.videoserror">
      {{ videoStore.videoserror }}
    </div>

    <div v-else class="grid md:grid-cols-3 gap-4">

      <div v-for="video in videoStore.videos" :key="video.id" class="card bg-base-100 shadow-md">
        <div class="card-body">
          <figure>
            <img :src="video.thumbnailUrl" alt="Thumbnail" class="w-full h-40 object-cover" @error="(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/fallback-thumbnail.jpg'
            }" />
          </figure>
          <h2 class="card-title text-sm truncate">
            {{ video.originalFileName }}
          </h2>

          <!-- <p class="text-xs opacity-60">
            {{ new Date(video.createdAt).toLocaleDateString() }}
          </p> -->

          <RouterLink :to="`/video/${video.id}`" class="btn btn-primary btn-sm mt-4">
            İzle
          </RouterLink>

        </div>
      </div>

    </div>

  </div>

</template>
