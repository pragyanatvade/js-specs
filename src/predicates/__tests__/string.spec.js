import predicates from '..';

describe('predicates', () => {
  describe('string', () => {
    const { string } = predicates;
    it('When `data` is not a string, Should return false', () => {
      const data = 3;
      const resp = string(data);
      expect(resp).toBeFalsy();
    });
    it('When `data` is anything is a string, Should return true', () => {
      const data = '3';
      const resp = string(data);
      expect(resp).toBeTruthy();
    });
  });
});
