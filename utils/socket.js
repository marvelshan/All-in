import { Server } from 'socket.io';

let io;
export async function initializeWebSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: 'https://www.ygolonhcet.online',
      methods: ['GET', 'POST'],
    },
  });
  io.on('connection', () => {
    console.log('socket connect');
  });
}
export { io };
