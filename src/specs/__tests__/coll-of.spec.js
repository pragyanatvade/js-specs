import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('collOf', () => {
    it('should work', () => {
      specs.def({ key: 'even', predicate: preds.even });
      specs.def({ key: 'even-coll', predicate: specs.collOf(preds.even) });
      const resp = specs.conform({ key: 'even-coll', data: [1, 2, 3] });
      console.log(resp);
    });
  });
});
