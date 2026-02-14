import api from "@/api/axios"

export interface LoginRequest {
  userName: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export const login = async (data: LoginRequest) => {
  const response = await api.post<LoginResponse>("/auth/login", data)
  return response.data
}
