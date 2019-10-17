import fs from 'fs';
import chalk from 'chalk';

const MESSAGE = {
  INVALID_INPUT_PIN: 'Input should be numerical from 0 to 10',
  INVALID_PIN_COUNT: 'Invalid pin count',
};

const DIR = {
  TEMP: './temp',
};

export const GAME_FILE_NAME = new Date().toISOString().slice(0, 10);


export const _getFrameModel = () => ({
  score: 0,
  scoreType: '',
  pins: [],
});

export const _getScoreType = (frame, pin) => {
  let type = 'normal';
  if ((pin === 10 && frame.pins.length === 0)
      || frame.pins[0] === 10) {
    type = 'strike';
  } else if ((frame.pins.length !== 2 && frame.pins[0] + pin === 10)
      || (frame.pins.length && frame.pins.reduce(_sum) === 10)) {
    type = 'spare';
  }
  return type;
};

export const _getPins = (frame, pin) => {
  let { pins } = frame;
  if (frame.pins.length !== 2) {
    pin === 10
      ? pins = [10, 0]
      : pins.push(pin);
  }
  return pins;
};

export const _updateScoreTypeNPins = (gameData, pin) => gameData.map((frame) => ({
  ...frame,
  scoreType: _getScoreType(frame, pin),
  pins: _getPins(frame, pin),
}));

export const _sum = (sum, num) => sum + num;

export const _calculateScore = (currentItem, nextItem, prevItem = { score: 0 }) => {
  let score = 0;
  if (nextItem) {
    if (currentItem.scoreType === 'strike') {
      score = prevItem.score
          + currentItem.pins.reduce(_sum)
          + nextItem.pins.reduce(_sum)
          + nextItem.pins.reduce(_sum);
    } else if (currentItem.scoreType === 'spare') {
      score = prevItem.score
          + currentItem.pins.reduce(_sum)
          + nextItem.pins.reduce(_sum)
          + nextItem.pins[0];
    } else if (currentItem.scoreType === 'normal') {
      score = prevItem.score + currentItem.pins.reduce(_sum);
    }
  } else if (currentItem.scoreType === 'normal') {
    score = currentItem.pins.reduce(_sum);
  }
  return score;
};

export const _updateScore = (gameData) => gameData.map((frame, index) => ({
  ...frame,
  score: _calculateScore(frame, gameData[index + 1], gameData[index - 1]),
}));


export const _isNotValidPin = (pin) => typeof pin !== 'number' || (pin < 0 || pin > 10);


export const _writeGameData = async (filename, data) => {
  const file = `${DIR.TEMP}/${filename}.json`;
  await fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

export const _readGameData = async (filename) => {
  try {
    const file = `${DIR.TEMP}/${filename}.json`;
    const rawData = await fs.readFileSync(file, 'utf8');
    return JSON.parse(rawData);
  } catch (e) {
    return [];
  }
};

export const _getGameData = async () => {
  let gameData = await _readGameData(GAME_FILE_NAME);
  if (!gameData.length || process.env.NODE_ENV === 'test') {
    gameData = [_getFrameModel()];
  }
  return gameData;
};


export const _addNewFrameToGameData = async (gameData) => {
  if (gameData[gameData.length - 1].pins.length === 2) {
    gameData.push(_getFrameModel());
  }
  return gameData;
};

export const _isNotValidPinCount = (gameData, pin) => (!!(((gameData[gameData.length - 1].pins.length !== 2)
      || ((gameData[gameData.length - 1].pins[0] || 0) + pin < 10))));

export const _getFormattedScores = (gameData) => {
  let message = '';

  gameData.forEach((frame, index) => {
    let color = 'cyan';
    if (frame.scoreType === 'strike') {
      color = 'red';
    } else if (frame.scoreType === 'spare') {
      color = 'yellow';
    }
    message += chalk[color](`
    Frame: ${index + 1}
    Pins: ${frame.pins} 
    Type: ${frame.scoreType}
    Score: ${frame.score}    
    `);
  });
  return message;
};

export const roll = async (pin) => {
  if (_isNotValidPin(pin)) { return MESSAGE.INVALID_INPUT_PIN; }

  const gameData = await _getGameData();

  if (_isNotValidPinCount(gameData, pin)) { return MESSAGE.INVALID_PIN_COUNT; }

  const updatedGameDataA = await _addNewFrameToGameData(gameData);
  const updatedGameDataB = await _updateScoreTypeNPins(updatedGameDataA, pin);
  const updatedGameDataC = await _updateScore(updatedGameDataB);

  if (process.env.NODE_ENV !== 'test') {
    await _writeGameData(GAME_FILE_NAME, updatedGameDataC);
  }

  return _getFormattedScores(gameData);
};

export const score = async () => {
  const gameData = await _getGameData();
  return _getFormattedScores(gameData);
};

const run = async () => {
  let message = '';
  if (process.env.SCORE) {
    message = await score();
  } else if (process.env.ROLL) {
    const pin = process.argv.slice(2)[0];
    message = await roll(parseInt(pin));
  }
  console.log(message);
};
run();
