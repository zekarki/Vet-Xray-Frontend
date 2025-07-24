// src/api.ts
import axios from "axios";

// Helper: Get CSRF token from cookies
// export const getCookie = (name: string): string => {
//   const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
//   return match ? decodeURIComponent(match[2]) : "";
// };

// Axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Send cookies (e.g., sessionid)
});
