import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('tuple', () => {
    it('When pass list of predicates, and not conforming data, Should return invalid', () => {
      specs.def({ key: 'tuple', predicate: specs.tuple([preds.even, preds.odd, preds.string]) });
      const resp = specs.conform({ key: 'tuple', data: [1, 2, 3] });
      expect(resp).toEqual(preds.invalid());
    });
    it('When pass list of predicates, and conforming data, Should return conformed value', () => {
      specs.def({ key: 'tuple', predicate: specs.tuple([preds.even, preds.odd, preds.string]) });
      const resp = specs.conform({ key: 'tuple', data: [2, 3, '4'] });
      expect(resp).toEqual([2, 3, '4']);
    });
  });
});
