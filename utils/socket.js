import { Server } from 'socket.io';
import cors from 'cors';

let io;
export async function initializeWebSocket(httpServer) {
  io = new Server(httpServer, {});
  io.on('connection', () => {
    console.log('socket connect');
  });
}
export { io };
