import runners from '..';

const { readConfig } = runners;

describe('runners', () => {
  describe('readConfig', () => {
    it('When params is undefined, Should return default parameters', () => {
      const params = readConfig();
      expect(params.examples).toEqual([]);
    });
  });
});
