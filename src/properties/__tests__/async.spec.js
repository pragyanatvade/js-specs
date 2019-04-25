import properties from '..';
import generators from '../../generators';
import helpers from '../../helpers';

const { integer } = generators;
const { randomBySeed: rand } = helpers;


describe('properties', () => {
  describe('async', () => {
    const { async } = properties;
    describe('run', () => {
      it('When generator is passed and predicate is valid, Should return null', async () => {
        const seed = Date.now();
        const min = 0;
        const max = 100;
        const arb = integer({ min, max });
        const predicate = async value => value > min || value < max;
        const { generate, run, isAsync } = async({ arb, predicate });
        const resp = await run(generate(rand(seed)));
        expect(isAsync()).toBeTruthy();
        expect(resp).toEqual(null);
      });
    });
  });
});
