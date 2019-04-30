import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('cat', () => {
    it('When we pass correct tuple, Should conform values to correct keys', () => {
      specs.def({ key: 'ingredient', predicate: specs.cat(['quantity', preds.int, 'value', preds.string]) });
      const resp = specs.conform({ key: 'ingredient', data: [2, 'spoon'] });
      expect(resp).toEqual({ quantity: 2, value: 'spoon' });
    });
    it('When we pass correct tuple, Should validate values', () => {
      specs.def({ key: 'ingredient', predicate: specs.cat(['quantity', preds.int, 'value', preds.string]) });
      const resp = specs.valid({ key: 'ingredient', data: [2, 'hello'] });
      expect(resp).toBeTruthy();
    });
    it('When we pass incorrect tuple, Should invalidate values', () => {
      specs.def({ key: 'ingredient', predicate: specs.cat(['quantity', preds.int, 'value', preds.string]) });
      const resp = specs.valid({ key: 'ingredient', data: [2, 123] });
      expect(resp).toBeFalsy();
    });
  });
});
