import predicates from '..';

describe('predicates', () => {
  describe('number', () => {
    const { number } = predicates;
    it('When `data` is number, Should return true', () => {
      const data = 3;
      const resp = number(data);
      expect(resp).toBeTruthy();
    });
    it('When `data` is anything other than a number, Should return false', () => {
      const data = '3';
      const resp = number(data);
      expect(resp).toBeFalsy();
    });
  });
});
