import generators from '..';
import helpers from '../../helpers';

const { randomBySeed: rand } = helpers;

const { char } = generators;

describe('generators', () => {
  describe('char', () => {
    describe('generate', () => {
      it('When char arbitrary is called, should be a valid character', () => {
        const seed1 = Date.now();
        const arb = char();
        const g = arb.generate(rand(seed1)).value;
        expect(g.length).toEqual(1);
        expect(g.charCodeAt(0)).toBeGreaterThanOrEqual(0x20);
        expect(g.charCodeAt(0)).toBeLessThanOrEqual(0x7e);
      });
    });
  });
});
