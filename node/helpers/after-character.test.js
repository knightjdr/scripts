const afterCharacter = require('./after-character');

describe('After character', () => {
  it('should get everything after a character', () => {
    const expected = '"test"';
    const string = '--arg="test"';
    expect(afterCharacter(string, '=')).toBe(expected);
  });

  it('should get everything after the first match to the character', () => {
    const expected = '"test=test"';
    const string = '--arg="test=test"';
    expect(afterCharacter(string, '=')).toBe(expected);
  });

  it('should return entire string when there is no match', () => {
    const expected = '--arg"testtest"';
    const string = '--arg"testtest"';
    expect(afterCharacter(string, '=')).toBe(expected);
  });
});
