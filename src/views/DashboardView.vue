<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Hls from 'hls.js'

const props = defineProps<{
  videoId: string
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const error = ref('')

onMounted(() => {
  const video = videoRef.value
  if (!video) return

  const streamUrl = `https://localhost:44304/api/Video/stream/a151c1b6-33a8-4436-b553-fd95c8acca53/index.m3u8`

  if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamUrl
    return
  }

  if (Hls.isSupported()) {
    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true
    })

    hls.loadSource(streamUrl)
    hls.attachMedia(video)

    hls.on(Hls.Events.ERROR, () => {
      error.value = 'Video yüklenemedi'
    })
  } else {
    error.value = 'Tarayıcı HLS desteklemiyor'
  }
})
</script>

<template>
      <!-- <div class="video-wrapper">
    <video
      ref="videoRef"
      controls
      autoplay
      playsinline
      class="video-player"
    ></video>

    <p v-if="error" class="error">{{ error }}</p>
  </div> -->
  
  <div class="drawer lg:drawer-open">
    <input id="drawer" type="checkbox" class="drawer-toggle" />

    <!-- Main Content -->
    <div class="drawer-content bg-base-200 min-h-screen p-6">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

      <!-- Stats -->
      <div class="stats shadow mb-8">
        <div class="stat">
          <div class="stat-title">Videos</div>
          <div class="stat-value text-primary">12</div>
        </div>

        <div class="stat">
          <div class="stat-title">Documents</div>
          <div class="stat-value text-secondary">8</div>
        </div>

        <div class="stat">
          <div class="stat-title">Storage Used</div>
          <div class="stat-value">2.3GB</div>
        </div>
      </div>

      <!-- Upload Section -->
      <div class="card bg-base-100 shadow-lg mb-6">
        <div class="card-body">
          <h2 class="card-title">Upload File</h2>
          <input type="file" class="file-input file-input-bordered w-full" />
          <button class="btn btn-primary mt-4">Upload</button>
        </div>
      </div>

      <!-- File List -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h2 class="card-title">Your Files</h2>

          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>lesson1.mp4</td>
                  <td>Video</td>
                  <td>500MB</td>
                  <td>
                    <button class="btn btn-sm btn-outline">View</button>
                    <button class="btn btn-sm btn-error ml-2">Delete</button>
                  </td>
                </tr>

                <tr>
                  <td>notes.pdf</td>
                  <td>PDF</td>
                  <td>2MB</td>
                  <td>
                    <button class="btn btn-sm btn-outline">View</button>
                    <button class="btn btn-sm btn-error ml-2">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>

 
  </div>

</template>