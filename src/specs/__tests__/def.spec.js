import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('def', () => {
    it('When key and predicate is passed, Should return true for valid data in the string', () => {
      const key = 'first-name';
      specs.def({ key, predicate: preds.string });
      const resp = specs.valid({ key, data: 'qweqweqw' });
      const resp2 = specs.conform({ key, data: '1231231' });
      // console.log(specs.explain({ key, data: 12132 }));
      expect(resp2).toBe('1231231');
      expect(resp).toBeTruthy();
    });
    it('When data and invalid predicate is passed, should return false', () => {
      const key = 'first-name';
      specs.def({ key, predicate: preds.string });
      const resp = specs.valid({ key, data: 21332 });
      expect(resp).toBeFalsy();
    });
  });
});
