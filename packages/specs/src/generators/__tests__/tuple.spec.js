import generators from '..';
import helpers from '../../helpers';

const { tuple, integer, string } = generators;
const { randomBySeed: rand } = helpers;

describe('generators', () => {
  describe('tuple', () => {
    describe('generate', () => {
      it('When arbitraries are passed, Should generate a tuple', () => {
        const arb1 = integer({ min: 0, max: 10 });
        const arb2 = integer({ min: 10, max: 20 });
        const arb3 = string({ min: 1, max: 100 });
        const seed = Date.now();
        const arb = tuple([arb1, arb2, arb3]);
        const { value } = arb.generate(rand(seed));
        expect(typeof value[0]).toEqual('number');
        expect(typeof value[1]).toEqual('number');
        expect(typeof value[2]).toEqual('string');
        expect(value.length).toEqual(3);
      });
    });
    describe('shrink', () => {
      it('When arbitraries are passed, Should shrink a tuple', () => {
        const arb1 = integer({ min: 0, max: 10 });
        const arb2 = integer({ min: 10, max: 20 });
        const arb3 = string({ min: 1, max: 100 });
        const seed = Date.now();
        const arb = tuple([arb1, arb2, arb3]);
        const { shrink } = arb.generate(rand(seed));
        shrink().every(({ value }) => {
          expect(typeof value[0]).toEqual('number');
          expect(typeof value[1]).toEqual('number');
          expect(typeof value[2]).toEqual('string');
          expect(value.length).toEqual(3);
          return true;
        });
      });
    });
  });
});
