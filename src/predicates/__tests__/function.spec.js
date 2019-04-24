import predicates from '..';

describe('predicates', () => {
  describe('function', () => {
    const { fn } = predicates;
    it('When data is a function, should return true', () => {
      const data = () => { };
      const resp = fn(data);
      expect(resp).toBeTruthy();
    });
    it('When data is not a function, should return false', () => {
      const data = '1231';
      const resp = fn(data);
      expect(resp).toBeFalsy();
    });
  });
});
