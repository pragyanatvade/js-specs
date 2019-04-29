import predicates from '..';

describe('predicates', () => {
  describe('mapOf', () => {
    const { int, mapOf } = predicates;
    it('When map has [key, value] = [string, int], Should return true if we pass valid object', () => {
      const pred = mapOf(int);
      const resp = pred({ hello: 1, world: 2 });
      expect(resp).toBeTruthy();
    });
    it('When map has [key, value] = [string, int], Should return true if we pass invalid object', () => {
      const pred = mapOf(int);
      const resp = pred({ hello: 1, world: '3' });
      expect(resp).toBeFalsy();
    });
  });
});
