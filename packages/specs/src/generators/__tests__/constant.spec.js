import generators from '..';
import helpers from '../../helpers';

const { randomBySeed: rand } = helpers;
const { constant, constantFrom } = generators;

describe('generators', () => {
  describe('constant', () => {
    describe('generate', () => {
      it('When a value is passed, Should generate a constant arbitrary based on that', () => {
        const seed = Date.now();
        const instance = 42;
        const arb = constant(instance);
        const { value } = arb.generate(rand(seed));
        expect(value).toEqual(instance);
      });
      it('When undefined is passed, Should generate a constant arbitrary with undefined value', () => {
        const seed = Date.now();
        const instance = undefined;
        const arb = constant(instance);
        const { value } = arb.generate(rand(seed));
        expect(value).toEqual(instance);
      });
      it('When null is passed, Should generate a constant arbitrary with null value', () => {
        const seed = Date.now();
        const instance = null;
        const arb = constant(instance);
        const { value } = arb.generate(rand(seed));
        expect(value).toEqual(instance);
      });
      it('When array value is passed, Should return it as a constant arbitrary', () => {
        const seed = 12312;
        const instance = ['hello', 'world', 1231];
        const arb = constant(instance);
        const { value } = arb.generate(rand(seed));
        expect(value).toEqual(instance);
        instance.push('12312');
        expect(value).toEqual(instance);
      });
    });
  });
  describe('constantFrom', () => {
    describe('generate', () => {
      it('When array of values is passed, Should select constant from those values', () => {
        const seed = Date.now();
        const values = [1212, '12312', 12312];
        const arb = constantFrom(values);
        const { value } = arb.generate(rand(seed));
        const exists = values.indexOf(value) !== -1;
        expect(exists).toBeTruthy();
      });
    });
  });
});
