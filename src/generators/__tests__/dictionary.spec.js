import generators from '..';
import helpers from '../../helpers';

const { randomBySeed: rand } = helpers;
const { dict, string, integer } = generators;

describe('generators', () => {
  describe('dict', () => {
    describe('generate', () => {
      it('When key is a string, value is a number, Should generate dictionary of string and number', () => {
        const seed = Date.now();
        const key = string({ min: 0, max: 10 });
        const value = integer({ min: 0, max: 10 });
        const arb = dict({ key, value });
        const resp = arb.generate(rand(seed));
        console.log('resp', resp);
      });
    });
  });
});
