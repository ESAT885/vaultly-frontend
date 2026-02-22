import { defineStore } from "pinia"
import * as videoService from "@/api/video.service"
import type { VideoDto } from "@/types/videoDto.types"

export const useVideoStore = defineStore("video", {
  state: () => ({
    uploading: false,
    progress: 0,
    currentVideoId: null as string | null,
    videos: [] as VideoDto[],
    videosloading: false,
    videoserror: null as string | null
  }),
  getters: {
    videoCount: (state) => state.videos.length
  },
  actions: {
    async uploadVideo(file: File) {
      try {
        this.uploading = true
        this.progress = 0

        // 1️⃣ INIT
        const initRes = await videoService.videoService.init(file.name)

        const videoId = initRes?.data?.id ?? ""


        this.currentVideoId = videoId ?? "";

        // 2️⃣ CHUNK UPLOAD
        const chunkSize = 5 * 1024 * 1024 // 5MB
        const totalChunks = Math.ceil(file.size / chunkSize)

        for (let i = 0; i < totalChunks; i++) {
          const start = i * chunkSize
          const end = start + chunkSize
          const chunk = file.slice(start, end)

          await videoService.videoService.uploadChunk(videoId, i, chunk)

          this.progress = Math.round(((i + 1) / totalChunks) * 100)
        }

        // 3️⃣ COMPLETE
        await videoService.videoService.complete(videoId)

      } finally {
        this.uploading = false
        await this.fetchVideos()
      }
    },
    async fetchVideos() {
      try {
        this.videosloading = true
        this.videoserror = null

        const res = await videoService.videoService.getVideos()

        this.videos = res.data.data ?? res.data

      } catch (err: any) {
        this.videoserror = err.message
      } finally {
        this.videosloading = false
      }
    }
  }
})
