export interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

export enum ServiceType {
  KTP = 'KTP',
  KK = 'KK',
  PASSPORT = 'PASSPORT',
  SIM = 'SIM'
}

export interface QueueTicket {
  id: string;
  service: ServiceType;
  number: string; // e.g., A-005
  status: 'WAITING' | 'CALLED' | 'COMPLETED';
  estimatedTime: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}