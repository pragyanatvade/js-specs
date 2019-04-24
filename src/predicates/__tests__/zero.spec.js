import predicates from '..';

describe('predicates', () => {
  describe('zero', () => {
    const { zero } = predicates;
    it('When data is zero, should return true', () => {
      const data = 0;
      const resp = zero(data);
      expect(resp).toBeTruthy();
    });
    it('When data is not zero, should return false', () => {
      const data = '1231';
      const resp = zero(data);
      expect(resp).toBeFalsy();
    });
  });
});
