import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('collOf', () => {
    it('When pass even predicate and list of integer, Should return invalid', () => {
      specs.def({ key: 'even', predicate: preds.even });
      specs.def({ key: 'even-coll', predicate: specs.collOf(preds.even) });
      const resp = specs.conform({ key: 'even-coll', data: [1, 2, 3] });
      expect(resp).toEqual(preds.invalid());
    });
    it('When pass even predicate and list of even numbers, Should return conformed value', () => {
      specs.def({ key: 'even', predicate: preds.even });
      specs.def({ key: 'even-coll', predicate: specs.collOf(preds.even) });
      const resp = specs.conform({ key: 'even-coll', data: [2, 4, 6] });
      expect(resp).toEqual([2, 4, 6]);
    });
  });
});
