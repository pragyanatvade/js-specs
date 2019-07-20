import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('keys', () => {
    it('should define maps', () => {
      specs.def({ key: 'first', predicate: preds.string });
      specs.def({ key: 'last', predicate: preds.string });
      specs.def({ key: 'name', predicate: specs.keys(['first', 'last']) });
      const data = { first: 'asdas', last: '1231' };
      const resp = specs.conform({ key: 'name', data });
      expect(resp).toEqual(data);
    });
    it('should enable defining nested maps', () => {
      specs.def({ key: 'first', predicate: preds.string });
      specs.def({ key: 'last', predicate: preds.string });
      specs.def({ key: 'username', predicate: preds.string });
      specs.def({ key: 'name', predicate: specs.keys(['first', 'last']) });
      specs.def({ key: 'profile', predicate: specs.keys(['name', 'username']) });
      const data = { name: { first: 'asdas', last: '1231' }, username: '1231' };
      const resp = specs.conform({ key: 'profile', data });
      expect(resp).toEqual(data);
    });
  });
});
