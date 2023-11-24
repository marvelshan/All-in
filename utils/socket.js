import { Server } from 'socket.io';
import { client, clientSubscriber } from './cache.js';

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

let gameOdds;
let gameData;

async function initializeWebSocket(httpServer) {
  const io = new Server(httpServer, {});
  io.on('connection', (socket) => {
    console.log('websocket connect');

    socket.on('event', async () => {
      clientSubscriber.on('message', async (channel, message) => {
        if (channel === 'odds') {
          gameOdds = await client.get(`odds${message}`);
          socket.emit('odds', gameOdds);
        } else if (channel === 'game') {
          gameData = await client.get(`game${message}`);
          socket.emit('gameEvent', gameData);
        }
      });
    });
  });
}

export default initializeWebSocket;
