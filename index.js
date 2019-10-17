
export const roll = () => '';

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
