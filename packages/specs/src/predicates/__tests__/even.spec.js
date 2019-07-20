import predicates from '..';

describe('predicates', () => {
  describe('even', () => {
    const { even } = predicates;
    it('When `data` is even number, should return true', () => {
      const data = 2;
      const resp = even(data);
      expect(resp).toBeTruthy();
    });
    it('When `data` odd number, Should return false', () => {
      const data = 3;
      const resp = even(data);
      expect(resp).toBeFalsy();
    });
  });
});
