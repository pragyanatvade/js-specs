import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('or', () => {
    it('should define spec using previosly defined keynames', () => {
      specs.def({ key: 'str', predicate: preds.string });
      specs.def({ key: 'num', predicate: preds.int });

      specs.def({ key: 'str-or-num', predicate: specs.or(['str', 'num']) });
      const resp = specs.conform({ key: 'str-or-num', data: 12345 });
      expect(resp).toEqual(12345);
      const valid = specs.valid({ key: 'str-or-num', data: 'asdasda' });
      expect(valid).toBeTruthy();
      const invalid = specs.valid({ key: 'str-or-num', data: true });
      expect(invalid).toBeFalsy();
    });
    it('should define spec with array of key preds', () => {
      specs.def({ key: 'str-or-num', predicate: specs.or([{ key: 'str', predicate: preds.string }, { key: 'num', predicate: preds.int }]) });
      const resp = specs.conform({ key: 'str-or-num', data: 1231 });
      expect(resp).toEqual(1231);
      const valid = specs.valid({ key: 'str-or-num', data: 'asdasda' });
      expect(valid).toBeTruthy();
      const invalid = specs.valid({ key: 'str-or-num', data: true });
      expect(invalid).toBeFalsy();
    });
    it('should define composite spec using only preds', () => {
      specs.def({ key: 'str-or-num', predicate: specs.or([{ predicate: preds.num }, { predicate: preds.string }]) });
      const resp = specs.conform({ key: 'str-or-num', data: 1231 });
      expect(resp).toEqual(1231);
    });
    it('should define composite spec using only preds functions', () => {
      specs.def({ key: 'str-or-num', predicate: specs.or([preds.num, preds.string]) });
      const resp = specs.conform({ key: 'str-or-num', data: 1231 });
      expect(resp).toEqual(1231);
    });
  });
});
