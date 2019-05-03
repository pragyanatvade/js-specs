import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('schema', () => {
    describe('conform', () => {
      it('When we pass valid object, Should conform to defined schema', () => {
        specs.def({ key: 'first-name', predicate: preds.string });
      });
    });
  });
});
