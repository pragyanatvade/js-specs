import predicates from '..';

describe('predicates', () => {
  describe('invalid', () => {
    const { invalid } = predicates;
    it('When data, Should return invalid symbol', () => {
      const data = 121;
      const resp = invalid(data);
      expect(resp).toEqual(Symbol.for(':cradle.specs/invalid'));
    });
  });
});
