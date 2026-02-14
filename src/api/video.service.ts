import type { VideoDto } from "@/types/videoDto.types";
import api from "./axios";
import type { ApiResponse } from "@/types/api.types";

export const videoService = {
async init(fileName: string): Promise<ApiResponse<VideoDto>>{
  return  api.post(
    `/video/init?fileName=${fileName}`
  )
  
},

  uploadChunk(videoId: string, index: number, file: Blob) {
    const form = new FormData();
    form.append("videoId", videoId);
    form.append("index", index.toString());
    form.append("file", file);

    return api.post("/video/chunk", form);
  },

  complete(videoId: string) {
    return api.post("/video/complete", null, {
      params: { videoId },
    });
  },

  streamUrl(videoId: string, file: string) {
    return `https://localhost:44304/api/video/stream/${videoId}/${file}`;
  },
  getVideos() {
    return api.get("/Video", {

    })
  }
};
