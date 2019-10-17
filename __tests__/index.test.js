import {
  roll,
  score,
} from '../index';

describe('Roll', () => {
  it('should return a message', () => {
    expect(typeof roll()).toEqual('string');
  });
});


describe('Score', () => {
  it('should return a message', () => {
    expect(typeof score()).toEqual('string');
  });
});
