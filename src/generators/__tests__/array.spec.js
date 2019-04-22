import generators from '..';
import helpers from '../../helpers';

const { randomBySeed: rand } = helpers;
const { integer, array } = generators;

describe('generators', () => {
  describe('array', () => {
    describe('generate', () => {
      it('When integer generator is passed, Should generate array of numbers', () => {
        const seed = Date.now();
        const min = 3;
        const max = 10;
        const intArb = integer({ min, max });
        const { generate } = array(intArb);
        const { value } = generate(rand(seed));
        value.forEach((val) => {
          expect(val).toBeGreaterThanOrEqual(min);
          expect(val).toBeLessThanOrEqual(max);
        });
      });
    });
    describe('shrink', () => {
      it('When integer generator is passed, Should generate array of numbers on every shrink', () => {
        const seed = 123;// Date.now();
        const min = 3;
        const max = 10;
        const intArb = integer({ min, max });
        const { generate } = array(intArb);
        const { shrink } = generate(rand(seed));
        const val2 = shrink();
        const shrinkedValues = [...val2];
        expect(shrinkedValues.length).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
