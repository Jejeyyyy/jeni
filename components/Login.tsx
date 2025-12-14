import React, { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { GOOGLE_CLIENT_ID } from '../constants';

interface LoginProps {
  onLoginSuccess: (user: UserProfile) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [error, setError] = useState<string | null>(null);

  // Function to handle the Credential Response from Google
  const handleCredentialResponse = (response: any) => {
    try {
      // Decode the JWT token to get user info
      // Note: In a production app, verify this token on your backend!
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      
      const user: UserProfile = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      };

      onLoginSuccess(user);
    } catch (err) {
      setError("Gagal memproses login Google.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById("googleIconBtn"),
        { theme: "outline", size: "large", width: "100%" } 
      );
    } else {
      setError("Gagal memuat skrip Google Sign-In. Periksa koneksi internet.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDemoLogin = () => {
    onLoginSuccess({
      name: "Mahasiswa Demo",
      email: "demo@student.university.ac.id",
      picture: "https://picsum.photos/100/100"
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
           <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
             <span className="text-4xl">🏛️</span>
           </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Ruang Tunggu Pintar</h1>
        <p className="text-gray-500 mb-8">Silakan masuk untuk mengambil antrian layanan publik.</p>

        {/* Google Button Container */}
        <div id="googleIconBtn" className="w-full flex justify-center mb-4 min-h-[40px]"></div>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        <div className="mt-6 border-t pt-6">
           <p className="text-xs text-gray-400 mb-2">Untuk keperluan Demo/Tugas jika Client ID belum diset:</p>
           <button 
             onClick={handleDemoLogin}
             className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
           >
             Masuk Sebagai Tamu (Demo)
           </button>
        </div>
      </div>
      <p className="mt-8 text-gray-400 text-xs">Tugas Pengembangan Aplikasi Mobile & Cloud</p>
    </div>
  );
};

export default Login;