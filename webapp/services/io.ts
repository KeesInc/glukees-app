import { io } from 'socket.io-client';

const websocketUrl = 'https://api.glukees.online' || 'http://localhost:4000'
export const socket = io(websocketUrl)