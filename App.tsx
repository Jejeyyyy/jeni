import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SmartAssistant from './components/SmartAssistant';
import { UserProfile, ServiceType, QueueTicket } from './types';
import { SERVICE_INFO } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTicket, setActiveTicket] = useState<QueueTicket | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const handleLoginSuccess = (userData: UserProfile) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTicket(null);
    // In a real Google Identity implementation, you might want to call google.accounts.id.disableAutoSelect()
  };

  const handleSelectService = (service: ServiceType) => {
    // Simulate generating a ticket
    const info = SERVICE_INFO[service];
    // Random number between 10 and 99
    const randomNum = Math.floor(Math.random() * 89) + 10;
    const ticketNumber = `${info.prefix}-${randomNum.toString().padStart(3, '0')}`;
    
    const newTicket: QueueTicket = {
      id: Date.now().toString(),
      service: service,
      number: ticketNumber,
      status: 'WAITING',
      estimatedTime: `${Math.floor(Math.random() * 30) + 15} Menit`,
      timestamp: Date.now()
    };

    setActiveTicket(newTicket);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {!user ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Dashboard 
            user={user}
            activeTicket={activeTicket}
            onSelectService={handleSelectService}
            onOpenAssistant={() => setIsAssistantOpen(true)}
            onLogout={handleLogout}
          />
          <SmartAssistant 
            isOpen={isAssistantOpen} 
            onClose={() => setIsAssistantOpen(false)} 
          />
        </>
      )}
    </div>
  );
};

export default App;