import generators from '..';
import helpers from '../../helpers';

const { string, integer, record } = generators;
const { randomBySeed: rand } = helpers;

describe('generators', () => {
  describe('record', () => {
    describe('generate', () => {
      it('When a generative schema is passed, should generate values as per the schema', () => {
        const seed = Date.now();
        const schema = {
          a: string({ min: 0, max: 10 }),
          b: integer({ min: 0, max: 10 })
        };
        const arb = record(schema);
        const { value } = arb.generate(rand(seed));
        expect(typeof value.a).toEqual('string');
        expect(typeof value.b).toEqual('number');
      });
    });
  });
});
