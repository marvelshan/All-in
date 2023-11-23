import { Server } from 'socket.io';
import { client, clientSubscriber } from './cache.js';

async function initializeWebSocket(httpServer) {
  const io = new Server(httpServer, {});
  io.on('connection', (socket) => {
    console.log('websocket connect');

    socket.on('event', async () => {
      await clientSubscriber.subscribe('game', (error) => {
        if (error) {
          console.log(`socket redis error on ${error}`);
        }
      });
      await clientSubscriber.subscribe('odds', (error) => {
        if (error) {
          console.log(`socket redis error on ${error}`);
        }
      });

      clientSubscriber.on('message', async (channel, message) => {
        if (channel === 'odds') {
          const gameOdds = await client.get(`odds${message}`);
          socket.emit('odds', gameOdds);
        } else if (channel === 'game') {
          const gameData = await client.get(`game${message}`);
          socket.emit('gameEvent', gameData);
        }
      });
    });
  });
}

export default initializeWebSocket;
