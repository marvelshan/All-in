import { Server } from 'socket.io';
import client from './cache.js';

async function initializeWebSocket(httpServer) {
  const io = new Server(httpServer, {});
  io.on('connection', (socket) => {
    console.log('websocket connect');

    socket.on('event', async () => {
      await client.subscribe('dataUpdated', (error) => {
        if (error) {
          console.log(`socket redis error on ${error}`);
        }
      });
      client.on('message', async (channel, message) => {
        const gameData = JSON.parse(message);
        socket.emit('likeupdated', gameData);
      });
    });
  });
}

export default initializeWebSocket;
