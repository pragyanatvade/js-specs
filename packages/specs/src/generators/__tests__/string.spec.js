import generators from '..';
import helpers from '../../helpers';

const { randomBySeed: rand } = helpers;
const { string } = generators;

describe('generators', () => {
  describe('string', () => {
    describe('generate', () => {
      it('When min/max values are passed, Should generate string so that length is within [min, max]', () => {
        const seed = Date.now();
        const min = 2;
        const max = 10;
        const arb = string({ min, max });
        const { value } = arb.generate(rand(seed));
        expect(value.length).toBeLessThanOrEqual(max);
        expect(value.length).toBeGreaterThanOrEqual(min);
      });
    });
  });
});
