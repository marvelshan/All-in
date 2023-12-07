import { Server } from 'socket.io';

let io;
export async function initializeWebSocket(httpServer) {
  io = new Server(httpServer, {});
  io.on('connection', () => {
    console.log('socket connect');
  });
}
export { io };
