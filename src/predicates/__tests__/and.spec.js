import predicates from '..';

describe('predicates', () => {
  describe('and', () => {
    const { int, even, and } = predicates;
    it('When even integer is passed, check int and even predicates, should return true', () => {
      const resp = and([int, even])(2);
      expect(resp).toBeTruthy();
    });
    it('When odd integer is passed, check int and even predicates, should return false', () => {
      const resp = and([int, even])(1);
      expect(resp).toBeFalsy();
    });
  });
});
