import { io } from 'socket.io-client';

const websocketUrl = process.env.WEBSOCKET_URL || 'http://localhost:4000'
export const socket = io(websocketUrl)