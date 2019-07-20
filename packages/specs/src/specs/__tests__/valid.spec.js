import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('valid', () => {
    it('When data and predicate is passed, should validate against the predicate', () => {
      const data = 100;
      const resp = specs.valid({ data, predicate: preds.int });
      expect(resp).toBeTruthy();
    });
    it('When data and invalid predicate is passed, should return false', () => {
      const data = 100;
      const resp = specs.valid({ data, predicate: preds.string });
      expect(resp).toBeFalsy();
    });
  });
});
