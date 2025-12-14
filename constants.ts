// MAHASISWA: Atur Vite env `VITE_GOOGLE_CLIENT_ID` pada environment/CI.
// Fallback di bawah hanya untuk kemudahan lokal; sebaiknya gunakan env vars.
const _env = import.meta.env as { VITE_GOOGLE_CLIENT_ID?: string };
export const GOOGLE_CLIENT_ID = _env.VITE_GOOGLE_CLIENT_ID || "230938970310-5qnbsr2jb0lf9puc673k6edemgm0f3qf.apps.googleusercontent.com";

// Helper to map service types to display names and colors
export const SERVICE_INFO = {
  KTP: {
    label: "Pembuatan KTP",
    color: "bg-blue-500",
    icon: "🪪",
    prefix: "A"
  },
  KK: {
    label: "Kartu Keluarga",
    color: "bg-green-500",
    icon: "👨‍👩‍👧‍👦",
    prefix: "B"
  },
  PASSPORT: {
    label: "Paspor",
    color: "bg-red-500",
    icon: "🛂",
    prefix: "C"
  },
  SIM: {
    label: "SIM A/C",
    color: "bg-yellow-500",
    icon: "🚗",
    prefix: "D"
  }
};