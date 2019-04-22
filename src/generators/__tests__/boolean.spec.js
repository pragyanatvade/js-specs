import generators from '..';
import helpers from '../../helpers';

const { randomBySeed: rand } = helpers;
const { boolean } = generators;

describe('generators', () => {
  describe('boolean', () => {
    describe('generate', () => {
      it('Should generate uniform true/false values', () => {
        const seed1 = Date.now();
        const seed2 = seed1 + 1;
        const arb = boolean();
        const g1 = arb.generate(rand({ seed: seed1 })).value;
        const g2 = arb.generate(rand({ seed: seed2 })).value;
        const resp = (g1 === true && g2 === false) || (g1 === false && g2 === true);
        expect(resp).toBeTruthy();
      });
    });
  });
});
