import predicates from '..';

describe('predicates', () => {
  describe('collOf', () => {
    const {
      int, string, collOf, or
    } = predicates;
    it('When we pass array of integer, Should return true', () => {
      const pred = collOf(int);
      const resp = pred([1, 2, 3, 12]);
      expect(resp).toBeTruthy();
    });
    it('When we pass array of string and integer, Should return false', () => {
      const pred = collOf(int);
      const resp = pred([1, '2', 3, '12']);
      expect(resp).toBeFalsy();
    });
    it('When predicate is `or[int, string]` and data is array of string and integer, Should return true', () => {
      const pred = collOf(or([int, string]));
      const resp = pred([1, '2', 3, '12']);
      expect(resp).toBeTruthy();
    });
  });
});
