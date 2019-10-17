import {
  roll,
  score,
  _getFrameModel,
} from '../index';

describe('Roll', () => {
  it('should return a message', () => {
    expect(typeof roll()).toEqual('string');
  });
  describe('Methods', () => {
    it('should return frame model', () => {
      expect(typeof _getFrameModel()).toEqual('object');
    });
  });
});


describe('Score', () => {
  it('should return a message', () => {
    expect(typeof score()).toEqual('string');
  });
});
