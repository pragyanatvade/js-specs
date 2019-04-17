import helpers from '..';

const { shrinkable } = helpers;

describe('helpers', () => {
  describe('shrinkable', () => {
    it('When constant value is passed, Should create a shrinkable object', () => {
      const value = 123;
      const resp = shrinkable(value);
      const keys = Object.keys(resp);
      expect(resp.value).toEqual(value);
      expect(keys).toEqual(['map', 'filter', 'value', 'shrink']);
    });
  });
});
