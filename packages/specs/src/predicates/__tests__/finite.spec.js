import predicates from '..';

describe('predicates', () => {
  describe('finite', () => {
    const { finite, isFinite } = predicates;
    it('When `data` is a number, should return true', () => {
      const data = 10;
      expect(isFinite(data)).toBeTruthy();
      expect(finite(data)).toBeTruthy();
    });
    it('When `data` is a string, should return false', () => {
      const data = '10';
      expect(isFinite(data)).toBeFalsy();
      expect(finite(data)).toBeFalsy();
    });
  });
});
