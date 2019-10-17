
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
