const MESSAGE = {
  INVALID_INPUT_PIN: 'Input should be numerical from 0 to 10',
};

export const _isNotValidPin = (pin) => typeof pin !== 'number' || (pin < 0 || pin > 10);

export const roll = (pin) => {
  if (_isNotValidPin(pin)) {
    return MESSAGE.INVALID_INPUT_PIN;
  }
  return '';
};

export const score = () => '';

//
// Note: Private methods
//

export const _getFrameModel = () => ({
  score: 0,
  scoreType: '',
  pins: [],
});

export const _getScoreType = (frame, pin) => {
  let type = pin === 10 || frame.pins[0] === 10
    ? 'strike'
    : 'normal';
  if (frame.pins.length !== 2) {
    type = frame.pins[0] + pin
      ? 'spare'
      : type;
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

export const _calculateScore = (currentItem, nextItem) => {
  let score = 0;
  if (nextItem) {
    if (currentItem.scoreType === 'strike') {
      score = currentItem.pins.reduce(_sum) + nextItem.pins.reduce(_sum);
    } else if (currentItem.scoreType === 'spare') {
      score = currentItem.pins.reduce(_sum) + nextItem.pins[0];
    }
  } else if (currentItem.scoreType === 'normal') {
    score = currentItem.pins.reduce(_sum);
  }
  return score;
};

export const _updateScore = (gameData) => gameData.map((frame, index) => ({
  ...frame,
  score: _calculateScore(frame, gameData[index + 1]),
}));
