import api from "./axios";
import type { ApiResponse } from "@/types/api.types";
import type { StoredFileDto } from "@/types/storedFileDto";
import type { DownloadLinkResponse } from "@/types/downloadLinkResponse.types";
export const fileService = {

    init(fileName: string): Promise<ApiResponse<StoredFileDto>> {
        return api.post("/StoredFiles/init", null, {
            params: { fileName }
        });
    },

    uploadChunk(storedFileId: string, index: number, file: Blob) {
        const form = new FormData();
        form.append("storedFileId", storedFileId);
        form.append("index", index.toString());
        form.append("file", file);

        return api.post("/StoredFiles/chunk", form);
    },

    complete(storedFileId: string) {
        return api.post("/StoredFiles/complete", null, {
            params: { storedFileId },
        });
    },
    getFiles() {
        return api.get("/StoredFiles", {

        })
    },
    getDownloadLink(storedFileId: string) {
        return api.get(`/StoredFiles/download-link/${storedFileId}`)
    }

};
