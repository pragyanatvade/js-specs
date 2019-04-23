import generators from '..';
import helpers from '../../helpers';

const { float, double } = generators;
const { randomBySeed: rand } = helpers;

describe('generators', () => {
  describe('float', () => {
    describe('generate', () => {
      it('When generate is called, Should generate a float', () => {
        const seed = 1020;
        const arb = float();
        const { value } = arb.generate(rand(seed));
        expect(value).toBeLessThan(1);
        expect(value).toBeGreaterThan(0);
      });
    });
    describe('shrink', () => {
      it('When arbitraries are passed, Should shrink a tuple', () => {
        const seed = 1020;
        const arb = float();
        const { shrink } = arb.generate(rand(seed));
        shrink().every(({ value }) => {
          expect(value).toBeLessThan(1);
          expect(value).toBeGreaterThan(0);
          return true;
        });
      });
    });
  });
  describe('double', () => {
    describe('generate', () => {
      it('When generate is called, Should generate a float', () => {
        const seed = 1020;
        const arb = double();
        const { value } = arb.generate(rand(seed));
        expect(value).toBeLessThan(1);
        expect(value).toBeGreaterThan(0);
      });
    });
    describe('shrink', () => {
      it('When arbitraries are passed, Should shrink a tuple', () => {
        const seed = 1020;
        const arb = float();
        const { shrink } = arb.generate(rand(seed));
        shrink().every(({ value }) => {
          expect(value).toBeLessThan(1);
          expect(value).toBeGreaterThan(0);
          return true;
        });
      });
    });
  });
});
