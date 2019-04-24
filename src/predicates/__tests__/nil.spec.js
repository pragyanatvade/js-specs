import predicates from '..';

describe('predicates', () => {
  describe('nil', () => {
    const { isNil, nil } = predicates;
    it('When `data` is null, should return true', () => {
      const data = null;
      expect(isNil(data)).toBeTruthy();
      expect(nil(data)).toBeTruthy();
    });
    it('When `data` is not null, should return false', () => {
      const data = 'hello';
      expect(isNil(data)).toBeFalsy();
      expect(nil(data)).toBeFalsy();
    });
  });
});
