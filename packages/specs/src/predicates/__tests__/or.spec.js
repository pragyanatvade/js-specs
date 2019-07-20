import predicates from '..';

describe('predicates', () => {
  describe('or', () => {
    const { int, even, or } = predicates;
    it('When even integer is passed, check int and even predicates, should return true', () => {
      const resp = or([int, even])(2);
      expect(resp).toBeTruthy();
    });
    it('When odd integer is passed, check int and even predicates, should return false', () => {
      const resp = or([int, even])(1);
      expect(resp).toBeTruthy();
    });
  });
});
