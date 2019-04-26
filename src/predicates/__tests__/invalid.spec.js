import predicates from '..';

describe('predicates', () => {
  describe('invalid', () => {
    const { invalid } = predicates;
    it('When we pass data, Should return data as symbol', () => {
      const data = 121;
      const resp = invalid(data);
      expect(resp).toEqual(Symbol.for(data));
    });
    it('When data is undefined, Should return invalid symbol', () => {
      const resp = invalid();
      expect(resp).toEqual(Symbol.for(':vade.specs/invalid'));
    });
  });
});
