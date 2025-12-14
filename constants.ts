// MAHASISWA: Ganti string di bawah ini dengan Client ID dari Google Cloud Console Anda
export const GOOGLE_CLIENT_ID = "230938970310-met3m40dijvfvue0nb259bmipvq8argr.apps.googleusercontent.com";

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