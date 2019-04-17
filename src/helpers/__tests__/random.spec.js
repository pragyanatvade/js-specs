import helpers from '..';

const { random, xorshift128plus } = helpers;

describe('helpers', () => {
  describe('random', () => {
    describe('next', () => {
      it('Should generate values within range', () => {
        const rng = random({ gen: xorshift128plus(42) });
        const n = 3;
        for (let i = 0; i < 100; i += 1) {
          const v = rng.next(n);
          expect(v).toBeGreaterThanOrEqual(0);
          expect(v).toBeLessThanOrEqual((((1 << n) - 1) | 0)); // eslint-disable-line
        }
      });
    });
    describe('nextInt', () => {
      it('When min/max values are provided, Should generate values within range', () => {
        const rng = random(xorshift128plus(42));
        const min = 5;
        const max = 100;
        for (let i = 0; i < 100; i += 1) {
          const v = rng.nextInt({ min, max });
          expect(v).toBeGreaterThanOrEqual(min);
          expect(v).toBeLessThanOrEqual(max); // eslint-disable-line
        }
      });
      it('When seed is same, should generate same sequence', () => {
        const seed = 32;
        const rng1 = random({ gen: xorshift128plus(seed) });
        const rng2 = random({ gen: xorshift128plus(seed) });
        for (let i = 0; i < 100; i += 1) {
          expect(rng1.nextInt()).toEqual(rng2.nextInt());
        }
      });
    });
    describe('nextDouble', () => {
      it('Should produce number within range 0 and 1', () => {
        const seed = 30;
        const rng = random({ gen: xorshift128plus(seed) });
        for (let i = 0; i < 100; i += 1) {
          const val = rng.nextDouble();
          expect(val).toBeLessThanOrEqual(1);
          expect(val).toBeGreaterThanOrEqual(0);
        }
      });
    });
    describe.skip('clone', () => {
      it('Should clone the gene', () => {
        const seed = 25;
        const rng1 = random({ gen: xorshift128plus(seed) });
        const rng2 = rng1.clone();
        for (let i = 0; i < 100; i += 1) {
          expect(rng1.nextInt()).toEqual(rng2.nextInt());
        }
      });
    });
  });
});
