import generators from '..';
import helpers from '../../helpers';

const { integer, option } = generators;
const { randomBySeed: rand } = helpers;

describe('generators', () => {
  describe('options', () => {
    describe('generate', () => {
      it('When integer arbitrary is passed, should generate number and null sometimes', () => {
        const seed = Date.now();
        const min = 0;
        const max = 10;
        const intArb = integer({ min, max });
        const arb = option(intArb);
        const { value } = arb.generate(rand(seed));
        const check = value >= min || value <= max || value === null;
        expect(check).toBeTruthy();
      });
    });
  });
});
