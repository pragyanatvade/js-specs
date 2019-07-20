import predicates from '..';

describe('predicates', () => {
  describe('tuple', () => {
    const {
      int, string, tuple, or
    } = predicates;
    it('When we pass array of integer, Should return true', () => {
      const pred = tuple([int, int, string]);
      const resp = pred([1, 2, '1']);
      expect(resp).toBeTruthy();
    });
    it('When we pass array of string and integer, Should return false', () => {
      const pred = tuple([int, string, string]);
      const resp = pred([1, '2', 3, '12']);
      expect(resp).toBeFalsy();
    });
    it('When predicate is `or[int, string]` and data is array of string and integer, Should return true', () => {
      const pred = tuple([or([int, string]), int, string]);
      const resp = pred([1, 2, '3']);
      const resp2 = pred(['1', 2, '3']);
      expect(resp).toBeTruthy();
      expect(resp2).toBeTruthy();
    });
  });
});
