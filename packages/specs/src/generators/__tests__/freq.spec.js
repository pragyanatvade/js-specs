import generators from '..';
import helpers from '../../helpers';

const {
  integer, freq, oneOf, string
} = generators;

const { randomBySeed: rand } = helpers;

describe('generators', () => {
  describe('freq', () => {
    describe('generate', () => {
      it('When weight is 1, Should generate same values as oneOf arbitrary', () => {
        const seed = Date.now();
        const instances = [integer({ min: 0, max: 10 }), string({ min: 0, max: 10 })];
        const arb1 = freq(instances.map(instance => ({ weight: 1, arbitrary: instance })));
        const arb2 = oneOf(instances);
        const { value: value1 } = arb1.generate(rand(seed));
        const { value: value2 } = arb2.generate(rand(seed));
        expect(value1).toEqual(value2);
      });
    });
  });
});
