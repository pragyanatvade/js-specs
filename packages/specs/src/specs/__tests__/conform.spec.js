import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('conform', () => {
    it('When data and predicate is passed, should validate against the predicate', () => {
      const data = 100;
      const resp = specs.conform({ data, predicate: preds.int });
      expect(resp).toBe(data);
    });
    it('When data and invalid predicate is passed, should return invalid symbol', () => {
      const data = 100;
      const resp = specs.conform({ data, predicate: preds.string });
      expect(resp).toBe(preds.invalid());
    });
  });
});
