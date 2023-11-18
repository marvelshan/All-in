import * as model from '../model/game.js';

const getGameEvent = async (req, res) => {
  try {
    const gameRealtimeEvent = await model.getRealtimeEvent();
    res.send(gameRealtimeEvent);
    // req.on('close', () => {
    //   clearInterval(intervalId);
    //   res.end();
    // });
  } catch (error) {
    console.log(`getGameEvent controller error on ${error}`);
  }
};

export default getGameEvent;
