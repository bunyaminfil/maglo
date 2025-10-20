// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://case.nodelabs.dev/api",
  TIMEOUT: 10000, // 10 seconds
} as const;

export function getApiEndpoint(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}
