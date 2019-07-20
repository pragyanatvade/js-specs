import helpers from '..';

const { xorshift128plus, uniformIntDistribution } = helpers;

describe('helpers', () => {
  describe('uniforIntDistribution', () => {
    it('Should always generate values within range', () => {
      const seed = Date.now();
      const min = 20;
      const max = 2000;
      const gen = xorshift128plus(seed);
      const { value } = uniformIntDistribution({ min, max, gen });
      expect(value).toBeLessThanOrEqual(max);
      expect(value).toBeGreaterThanOrEqual(min);
    });
  });
});
