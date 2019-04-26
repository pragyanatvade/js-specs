import runners from '..';

import generators from '../../generators';
import properties from '../../properties';

const { check } = runners;
// const { randomBySeed: rand } = helpers;
const { integer } = generators;
const { sync: property } = properties;

describe('runners', () => {
  describe('check', () => {
    it('When we pass no arguments, Should throw an error', () => {
      expect(() => check()).toThrow();
    });
    it('When we pass property as arguments, Should validate the property', () => {
      const min = 0;
      const max = 100;
      const arb = integer({ min, max });
      const prop = property({ arb, predicate: value => value < 0 });
      const resp = check({ prop });
      expect(resp.verbose).toEqual(0);
      expect(resp.execution.value).toBeGreaterThanOrEqual(0);
      expect(resp.execution.failure).toEqual('Property failed by returning false');
    });
  });
});
