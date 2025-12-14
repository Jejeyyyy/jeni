import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askAssistant = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `Anda adalah asisten virtual "Ruang Tunggu Pintar" untuk layanan publik Indonesia.
        Jawablah pertanyaan pengguna dengan sopan, singkat, dan jelas mengenai persyaratan dokumen.
        
        Konteks pengetahuan Anda:
        1. KTP: Butuh Surat Pengantar RT/RW, Fotokopi KK.
        2. KK: Butuh Surat Pengantar RT/RW, Buku Nikah/Akta Cerai, Surat Pindah (jika ada).
        3. Paspor: E-KTP, KK, Akta Kelahiran/Ijazah/Buku Nikah.
        4. SIM: KTP asli & fotokopi, Surat Keterangan Sehat, Lulus Ujian Teori & Praktik.
        
        Gunakan bahasa Indonesia yang formal namun ramah. Batasi jawaban maksimal 3 paragraf pendek.`,
      }
    });
    
    return response.text || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, terjadi kesalahan pada sistem AI. Silakan coba lagi.";
  }
};