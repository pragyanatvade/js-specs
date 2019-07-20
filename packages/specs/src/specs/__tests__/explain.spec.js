import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('explain', () => {
    it('should be empty if spec is valid', () => {
      specs.def({ key: 'first', predicate: preds.string });
      const resp = specs.explain({ key: 'first', data: '12312' });
      expect(resp).toHaveLength(0);
    });
    it('should be empty if spec map is valid', () => {
      specs.def({ key: 'first', predicate: preds.string });
      specs.def({ key: 'last', predicate: preds.string });
      specs.def({ key: 'name', predicate: specs.keys(['first', 'last']) });
      const data = { first: 'first', last: 'last' };
      const resp = specs.explain({ key: 'name', data });
      expect(resp).toHaveLength(0);
    });
    it('should be non-empty if spec is invalid', () => {
      specs.def({ key: 'first', predicate: preds.string });
      const data = 1231231;
      const resp = specs.explain({ key: 'first', data });
      expect(resp[0].val).toEqual(data);
      expect(resp[0].status).toEqual('failed');
    });
    it('should be non-empty if spec map is invalid', () => {
      specs.def({ key: 'first', predicate: preds.string });
      specs.def({ key: 'last', predicate: preds.string });
      specs.def({ key: 'name', predicate: specs.keys(['first', 'last']) });
      const data = { first: 'first', last: 12312 };
      const resp = specs.explain({ key: 'name', data });
      expect(resp).toHaveLength(1);
      expect(resp).toEqual([{
        val: 12312, status: 'failed', predicate: 'str', key: 'last', path: ['$', 'last']
      }]);
    });
    it('should be non-empty if nested spec map is invalid', () => {
      specs.def({ key: 'first', predicate: preds.string });
      specs.def({ key: 'last', predicate: preds.string });
      specs.def({ key: 'phone', predicate: preds.num });
      specs.def({ key: 'name', predicate: specs.keys(['first', 'last']) });
      specs.def({ key: 'profile', predicate: specs.keys(['name', 'phone']) });
      const name = { first: 'first', last: 12312 };
      const resp = specs.explain({ key: 'profile', data: { name, phone: '1231' } });
      // console.log(JSON.stringify(resp));
      expect(resp).toHaveLength(2);
      expect(resp).toEqual([{
        val: 12312, status: 'failed', predicate: 'str', key: 'last', path: ['$', 'name', 'last']
      }, {
        val: '1231',
        status: 'failed',
        predicate: 'number',
        key: 'phone',
        path: ['$', 'phone']
      }]);
    });
  });
});
