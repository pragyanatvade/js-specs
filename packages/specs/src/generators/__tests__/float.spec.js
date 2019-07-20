import generators from '..';
import helpers from '../../helpers';

const { float, double } = generators;
const { randomBySeed: rand } = helpers;

describe('generators', () => {
  describe('float', () => {
    describe('generate', () => {
      it('When generate is called, Should generate a float', () => {
        const seed = Date.now();
        const arb = float();
        const { value } = arb.generate(rand(seed));
        expect(value).toBeLessThanOrEqual(1);
        expect(value).toBeGreaterThanOrEqual(0);
      });
    });
    describe('shrink', () => {
      it('When arbitraries are passed, Should shrink a tuple', () => {
        const seed = Date.now();
        const arb = float();
        const { shrink } = arb.generate(rand(seed));
        shrink().every(({ value }) => {
          expect(value).toBeLessThanOrEqual(1);
          expect(value).toBeGreaterThanOrEqual(0);
          return true;
        });
      });
    });
  });
  describe('double', () => {
    describe('generate', () => {
      it('When generate is called, Should generate a float', () => {
        const seed = Date.now();
        const arb = double();
        const { value } = arb.generate(rand(seed));
        expect(value).toBeLessThanOrEqual(1);
        expect(value).toBeGreaterThanOrEqual(0);
      });
    });
    describe('shrink', () => {
      it('When arbitraries are passed, Should shrink a tuple', () => {
        const seed = Date.now();
        const arb = double();
        const { shrink } = arb.generate(rand(seed));
        shrink().every(({ value }) => {
          expect(value).toBeLessThanOrEqual(1);
          expect(value).toBeGreaterThanOrEqual(0);
          return true;
        });
      });
    });
  });
});
