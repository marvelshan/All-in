import { Server } from 'socket.io';
import { getRealtimeEvent } from '../model/game.js';

async function initializeWebSocket(httpServer) {
  const io = new Server(httpServer, {});
  const initialGame = await getRealtimeEvent();
  io.on('connection', (socket) => {
    console.log('connect');

    socket.on('liked', () => {
      setInterval(async () => {
        const game = await getRealtimeEvent();
        socket.emit('likeupdated', game);
      }, 1000);
      socket.emit('likeupdated', initialGame);
    });
  });
}

export default initializeWebSocket;
