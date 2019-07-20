import helpers from '..';

const { compose } = helpers;

describe('helpers', () => {
  describe('compose', () => {
    it('When functions are passed as arguments, Should return the object with result of each function execution', () => {
      const func1 = () => ({ hello: 1 });
      const func2 = () => ({ world: 2 });
      const resp = compose(func1, func2)();
      expect(resp).toEqual({ hello: 1, world: 2 });
    });
    it('When array of functions is passed, Should return object with result of function execution', () => {
      const func1 = () => ({ hello: 1 });
      const func2 = () => ({ world: 2 });
      const resp = compose([func1, func2])();
      expect(resp).toEqual({ hello: 1, world: 2 });
    });
  });
});
