import predicates from '..';

describe('predicates', () => {
  describe('isInteger', () => {
    const { int, isInteger } = predicates;
    it('When `data` is an integer, should return true', () => {
      const data = 1000;
      expect(int(data)).toBeTruthy();
      expect(isInteger(data)).toBeTruthy();
    });
    it('When `data` is a float, should return false', () => {
      const data = 100.004;
      expect(int(data)).toBeFalsy();
      expect(isInteger(data)).toBeFalsy();
    });
    it('When data is string, should return false', () => {
      const data = '121321';
      expect(int(data)).toBeFalsy();
      expect(isInteger(data)).toBeFalsy();
    });
  });
});
