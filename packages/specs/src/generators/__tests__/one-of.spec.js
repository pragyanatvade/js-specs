import generators from '..';
import helpers from '../../helpers';

const { randomBySeed: rand } = helpers;
const {
  string, integer, array, oneOf
} = generators;

describe('generators', () => {
  describe('oneOf', () => {
    describe('generate', () => {
      it('When arbs are using string, integer, and array, Should generate value among those types only', () => {
        const seed = Date.now();
        const arbs = [
          string({ min: 0, max: 10 }),
          integer({ min: 0, max: 10 }),
          array(integer({ min: 0, max: 100 }))
        ];
        const oneOfArb = oneOf(arbs);
        const { value } = oneOfArb.generate(rand(seed));
        const isNumber = typeof value === 'number';
        const isString = typeof value === 'string';
        const isArray = Array.isArray(value);
        expect(isNumber || isString || isArray).toBeTruthy();
      });
    });
  });
});
