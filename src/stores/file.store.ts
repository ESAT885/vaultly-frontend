import { defineStore } from "pinia"
import * as fileService from "@/api/file.service"

import type { StoredFileDto } from "@/types/storedFileDto"
import type { DownloadLinkResponse } from "@/types/downloadLinkResponse.types"

export const useFileStore = defineStore("files", {
  state: () => ({
    uploading: false,
    progress: 0,
    currentstoredFileId: null as string | null,

    downloading: false,
    downloadProgress: 0,

    files: [] as StoredFileDto[],
    filesloading: false,
    fileserror: null as string | null,
  }),
  getters: {
    fileCount: (state) => state.files.length
  },
  actions: {
    async uploadFile(file: File) {
      try {
        this.uploading = true
        this.progress = 0

        // 1️⃣ INIT
        const initRes = await fileService.fileService.init(file.name)

        const storedFileId = initRes?.data?.id ?? ""


        this.currentstoredFileId = storedFileId ?? "";

        // 2️⃣ CHUNK UPLOAD
        const chunkSize = 5 * 1024 * 1024 // 5MB
        const totalChunks = Math.ceil(file.size / chunkSize)

        for (let i = 0; i < totalChunks; i++) {
          const start = i * chunkSize
          const end = start + chunkSize
          const chunk = file.slice(start, end)

          await fileService.fileService.uploadChunk(storedFileId, i, chunk)

          this.progress = Math.round(((i + 1) / totalChunks) * 100)
        }

        // 3️⃣ COMPLETE
        await fileService.fileService.complete(storedFileId)

      } finally {
        this.uploading = false
        await this.fetchFiles()
      }
    },
    async fetchFiles() {
      try {
        this.filesloading = true
        this.fileserror = null

        const res = await fileService.fileService.getFiles()

        this.files = res.data.data ?? res.data

      } catch (err: any) {
        this.fileserror = err.message
      } finally {
        this.filesloading = false
      }
    },
    async downloadFile(storedFileId: string) {
      try {
        this.downloading = true

        // 1️⃣ JWT ile signed link al
        
    const res = await fileService.fileService.getDownloadLink(storedFileId) 

        const dataurl =res.data.data ?? res.data

        // 2️⃣ Browser streaming ile indir
        window.location.href = dataurl.url

      } catch (err: any) {
        this.fileserror = err.message
      } finally {
        this.downloading = false
      }
    }
  }
})
