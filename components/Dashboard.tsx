import React, { useState, useEffect } from 'react';
import { UserProfile, ServiceType, QueueTicket } from '../types';
import { SERVICE_INFO } from '../constants';

interface DashboardProps {
  user: UserProfile;
  activeTicket: QueueTicket | null;
  onSelectService: (service: ServiceType) => void;
  onOpenAssistant: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  activeTicket, 
  onSelectService, 
  onOpenAssistant,
  onLogout
}) => {
  // Simulated current number for the active service
  const [currentServingNumber, setCurrentServingNumber] = useState<string>('---');

  useEffect(() => {
    if (activeTicket) {
      // Simulate the counter moving
      const info = SERVICE_INFO[activeTicket.service];
      let count = Math.max(1, parseInt(activeTicket.number.split('-')[1]) - 4);
      
      const interval = setInterval(() => {
        if (count < parseInt(activeTicket.number.split('-')[1])) {
           // Randomly increment every few seconds
           if (Math.random() > 0.7) {
             count++;
             setCurrentServingNumber(`${info.prefix}-${count.toString().padStart(3, '0')}`);
           }
        }
      }, 2000);

      setCurrentServingNumber(`${info.prefix}-${count.toString().padStart(3, '0')}`);

      return () => clearInterval(interval);
    }
  }, [activeTicket]);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full border border-gray-200" />
            <div>
              <p className="text-xs text-gray-500">Selamat Datang,</p>
              <h2 className="font-bold text-gray-800 text-sm">{user.name}</h2>
            </div>
          </div>
          <button onClick={onLogout} className="text-sm text-red-500 font-medium">
            Keluar
          </button>
        </div>
      </header>

      <main className="p-4 max-w-lg mx-auto space-y-6">
        
        {/* Active Ticket Card */}
        {activeTicket ? (
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
            <div className={`${SERVICE_INFO[activeTicket.service].color} p-4 text-white text-center`}>
              <h3 className="font-bold text-lg">Tiket Antrian Anda</h3>
              <p className="opacity-90">{SERVICE_INFO[activeTicket.service].label}</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-500 text-sm mb-1">Nomor Antrian</p>
              <h1 className="text-5xl font-bold text-gray-800 mb-6 tracking-wider">{activeTicket.number}</h1>
              
              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-xs text-gray-400">Sedang Dilayani</p>
                  <p className="text-xl font-semibold text-gray-700">{currentServingNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Estimasi Waktu</p>
                  <p className="text-xl font-semibold text-green-600">{activeTicket.estimatedTime}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-3 text-center text-xs text-gray-500 border-t">
              Silakan menunggu di area {SERVICE_INFO[activeTicket.service].label}
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-blue-800 font-medium">Anda belum mengambil antrian.</p>
            <p className="text-blue-600 text-sm">Pilih layanan di bawah untuk mendapatkan nomor.</p>
          </div>
        )}

        {/* Service Selection */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Pilih Layanan</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(ServiceType).map((key) => {
              const type = key as ServiceType;
              const info = SERVICE_INFO[type];
              return (
                <button
                  key={key}
                  disabled={!!activeTicket}
                  onClick={() => onSelectService(type)}
                  className={`p-4 rounded-xl shadow-sm border border-gray-100 bg-white flex flex-col items-center gap-2 transition transform active:scale-95 ${activeTicket ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
                >
                  <span className="text-3xl">{info.icon}</span>
                  <span className="font-medium text-gray-700 text-sm">{info.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold mb-1">Bingung syarat dokumen?</h3>
            <p className="text-sm opacity-90 mb-3">Tanyakan pada asisten pintar AI kami.</p>
            <button 
              onClick={onOpenAssistant}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
            >
              Tanya Sekarang
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -mb-2 -ml-2 w-16 h-16 bg-white opacity-10 rounded-full"></div>
        </div>

      </main>
      
      {/* Floating Action Button for AI (Mobile) */}
      <button 
        onClick={onOpenAssistant}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-indigo-700 transition z-20 animate-bounce-slow"
        aria-label="Buka Asisten AI"
      >
        <span className="text-2xl">🤖</span>
      </button>
    </div>
  );
};

export default Dashboard;