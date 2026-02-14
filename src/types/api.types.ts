export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  traceId?: string;
  errors?: Record<string, string[]>;
}
