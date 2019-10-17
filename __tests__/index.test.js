import {
  roll,
  score,
  _getFrameModel,
  _getScoreType,
  _getPins,
  _updateScoreTypeNPins,
  _sum,
  _calculateScore,
  _updateScore,
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
    it('should get correct pins', () => {
      expect(_getPins({
        score: 0,
        scoreType: '',
        pins: [5],
      }, 5)).toEqual([5, 5]);

      expect(_getPins({
        score: 0,
        scoreType: '',
        pins: [],
      }, 10)).toEqual([10, 0]);

      expect(_getPins({
        score: 0,
        scoreType: '',
        pins: [],
      }, 2)).toEqual([2]);
    });
    it('should update score type and pins on strike', () => {
      const gameDataMock = [
        {
          score: 0,
          scoreType: '',
          pins: [],
        },
      ];
      const gameDataExpected = [
        {
          score: 0,
          scoreType: 'strike',
          pins: [10, 0],
        },
      ];
      const pin = 10;
      expect(_updateScoreTypeNPins(gameDataMock, pin)).toEqual(gameDataExpected);
    });
    it('should update score type and pins on normal', () => {
      const gameDataMock = [
        {
          score: 0,
          scoreType: '',
          pins: [],
        },
      ];
      const gameDataExpected = [
        {
          score: 0,
          scoreType: 'normal',
          pins: [5],
        },
      ];
      const pin = 5;
      expect(_updateScoreTypeNPins(gameDataMock, pin)).toEqual(gameDataExpected);
    });
    it('should update score type and pins on spare', () => {
      const gameDataMock = [
        {
          score: 0,
          scoreType: '',
          pins: [6],
        },
      ];
      const gameDataExpected = [
        {
          score: 0,
          scoreType: 'spare',
          pins: [6, 4],
        },
      ];
      const pin = 4;
      expect(_updateScoreTypeNPins(gameDataMock, pin)).toEqual(gameDataExpected);
    });
    it('should return sum', () => {
      expect(_sum(5, 5)).toEqual(10);
    });
    it('should calculate score for incomplete pins', () => {
      const gameDataMock = [
        {
          score: 0,
          scoreType: '',
          pins: [6],
        },
      ];
      expect(_calculateScore(gameDataMock[0])).toEqual(0);
    });
    it('should calculate score for normal', () => {
      const gameDataMock = [
        {
          score: 0,
          scoreType: 'normal',
          pins: [4, 4],
        },
      ];
      expect(_calculateScore(gameDataMock[0])).toEqual(8);
    });
    it('should calculate score for spare', () => {
      const gameDataMock = [
        {
          score: 0,
          scoreType: 'spare',
          pins: [6, 4],
        },
        {
          score: 0,
          scoreType: 'normal',
          pins: [4, 4],
        },
      ];
      expect(_calculateScore(gameDataMock[0], gameDataMock[1])).toEqual(14);
    });
    it('should calculate score for strike', () => {
      const gameDataMock = [
        {
          score: 0,
          scoreType: 'strike',
          pins: [10, 0],
        },
        {
          score: 0,
          scoreType: 'normal',
          pins: [4, 4],
        },
      ];
      expect(_calculateScore(gameDataMock[0], gameDataMock[1])).toEqual(18);
    });
    it('should update score on normal', () => {
      const gameDataMock = [
        {
          score: 0,
          scoreType: 'normal',
          pins: [4, 4],
        },
      ];
      const gameDataExpected = [
        {
          score: 8,
          scoreType: 'normal',
          pins: [4, 4],
        },
      ];
      expect(_updateScore(gameDataMock)).toEqual(gameDataExpected);
    });
    it('should update score on spare', () => {
      const gameDataMock = [
        {
          score: 0,
          scoreType: 'spare',
          pins: [5, 5],
        },
        {
          score: 0,
          scoreType: 'normal',
          pins: [4, 4],
        },
      ];
      const gameDataExpected = [
        {
          score: 14,
          scoreType: 'spare',
          pins: [5, 5],
        },
        {
          score: 8,
          scoreType: 'normal',
          pins: [4, 4],
        },
      ];
      expect(_updateScore(gameDataMock)).toEqual(gameDataExpected);
    });
  });
});


describe('Score', () => {
  it('should return a message', () => {
    expect(typeof score()).toEqual('string');
  });
});
