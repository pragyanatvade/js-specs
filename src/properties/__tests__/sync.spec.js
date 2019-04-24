import properties from '..';
import generators from '../../generators';
import helpers from '../../helpers';

const { integer } = generators;
const { randomBySeed: rand } = helpers;


describe('properties', () => {
  describe('sync', () => {
    const { sync } = properties;
    describe('run', () => {
      it('When generator is passed and predicate is valid, Should return null', () => {
        const seed = Date.now();
        const min = 0;
        const max = 100;
        const arb = integer({ min, max });
        const predicate = value => value > min || value < max;
        const { generate, run } = sync({ arb, predicate });
        const resp = run(generate(rand(seed)));
        expect(resp).toEqual(null);
      });
    });
  });
});
