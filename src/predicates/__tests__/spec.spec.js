import predicates from '..';

describe('predicates', () => {
  describe('spec', () => {
    const { spec } = predicates;
    it('When `data` is not a spec object, Should return false', () => {
      const data = 3;
      const resp = spec(data);
      expect(resp).toBeFalsy();
    });
    it('When `data` is a spec object, Should return true', () => {
      const data = { conform: () => { } };
      const resp = spec(data);
      expect(resp).toBeTruthy();
    });
  });
});
