import generators from '..';
import helpers from '../../helpers';

const { randomBySeed: rand } = helpers;
const { set, integer } = generators;

describe('generators', () => {
  describe('set', () => {
    describe('generate', () => {
      it('When set with integer arbitrary is generated, Should have unique values', () => {
        const seed = Date.now();
        const intArb = integer({ min: 10, max: 100 });
        const arb = set({ arb: intArb, min: 0, max: 10 });
        const { value } = arb.generate(rand(seed));
        const obj = new Map();
        value.forEach(val => obj.set(val, true));
        expect([...obj.keys()].sort()).toEqual(value.sort());
      });
    });
  });
});
