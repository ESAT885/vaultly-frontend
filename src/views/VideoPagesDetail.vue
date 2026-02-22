<template>
  <div class="min-h-screen bg-base-200">

    <!-- HEADER -->
    <div class="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div class="flex-none">
        <button class="btn btn-ghost" @click="goBack">
          ← Geri
        </button>
      </div>

      <div class="flex-1">
        <span class="text-lg font-semibold">
          Vaultly Ders İçeriği
        </span>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="p-6 max-w-[1600px] mx-auto">

      <div class="flex flex-col lg:flex-row gap-6">

        <!-- VIDEO ALANI -->
        <div class="flex-1">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body p-0">
              <video
                ref="videoRef"
                controls
                autoplay
                playsinline
                class="w-full rounded-t-xl bg-black"
              ></video>
            </div>
          </div>

          <div v-if="error" class="alert alert-error mt-4">
            {{ error }}
          </div>
        </div>

        <!-- SAĞ PANEL -->
        <div class="w-full lg:w-[400px]">
          <div class="card bg-base-100 shadow-xl h-full">
            <div class="card-body">
              <h2 class="card-title">Açıklama</h2>

              <textarea
                v-model="description"
                class="textarea textarea-bordered h-48"
                placeholder="Bu ders hakkında not alabilirsiniz..."
              ></textarea>

              <div class="card-actions justify-end mt-4">
                <button class="btn btn-primary" @click="saveDescription">
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- PDF ALANI -->
      <div v-if="pdfUrl" class="mt-10">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4">PDF Kaynağı</h2>

            <iframe
              :src="pdfUrl"
              class="w-full h-[800px] rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Hls from 'hls.js'

const route = useRoute()
const router = useRouter()

const videoId = route.params.videoId as string

const videoRef = ref<HTMLVideoElement | null>(null)
const error = ref('')
const description = ref('')
const pdfUrl = ref<string | null>(null)

let hls: Hls | null = null

function goBack() {
  router.back()
}

function initVideo(id: string) {
  const video = videoRef.value
  if (!video) return

  const streamUrl = `https://localhost:44304/api/Video/stream/${id}/index.m3u8`
  pdfUrl.value = `https://localhost:44304/api/Video/pdf/${id}`

  if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamUrl
    return
  }

  if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(streamUrl)
    hls.attachMedia(video)

    hls.on(Hls.Events.ERROR, (_, data) => {
      console.error(data)
      error.value = 'Video yüklenemedi'
    })
  } else {
    error.value = 'Tarayıcı HLS desteklemiyor'
  }
}

function saveDescription() {
  console.log("Kaydedildi:", description.value)
  // burada backend'e POST atabilirsin
}

onMounted(() => {
  if (!videoId) {
    error.value = 'Video ID bulunamadı'
    return
  }

  initVideo(videoId)
})

onBeforeUnmount(() => {
  if (hls) {
    hls.destroy()
    hls = null
  }
})
</script>
