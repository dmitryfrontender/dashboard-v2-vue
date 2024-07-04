import { io, Socket } from 'socket.io-client';
import type { AlertRecord } from '@/models/AlertRecord';

export const getAlertSocket = (onAlert: (alert: AlertRecord) => void): Socket => {
  const socket = io(import.meta.env.VITE_APP_SOCKET_URL);

  socket.on('ALERT', (msg) => {
    onAlert(JSON.parse(msg));
  });

  return socket;
};
