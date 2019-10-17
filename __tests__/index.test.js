import {
  roll,
  score,
  _getFrameModel,
  _getScoreType,
} from '../index';

describe('Roll', () => {
  it('should return a message', () => {
    expect(typeof roll()).toEqual('string');
  });
  describe('Methods', () => {
    it('should return frame model', () => {
      expect(typeof _getFrameModel()).toEqual('object');
    });
    it('should get score type to normal', () => {
      const frame = {
        score: 0,
        scoreType: '',
        pins: [],
      };
      const pin = 5;
      expect(typeof _getScoreType(frame, pin)).toEqual('string');
      expect(_getScoreType(frame, pin)).toEqual('normal');
    });
    it('should get score type to strike', () => {
      const frame = {
        score: 0,
        scoreType: '',
        pins: [],
      };
      const pin = 10;
      expect(typeof _getScoreType(frame, pin)).toEqual('string');
      expect(_getScoreType(frame, pin)).toEqual('strike');
    });
    it('should get score type to spare', () => {
      const frame = {
        score: 0,
        scoreType: '',
        pins: [5],
      };
      const pin = 5;
      expect(typeof _getScoreType(frame, pin)).toEqual('string');
      expect(_getScoreType(frame, pin)).toEqual('spare');
    });
  });
});


describe('Score', () => {
  it('should return a message', () => {
    expect(typeof score()).toEqual('string');
  });
});
