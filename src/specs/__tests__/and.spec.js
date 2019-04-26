import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('and', () => {
    it('should define spec using previosly defined keynames', () => {
      specs.def({ key: 'even', predicate: preds.even });
      specs.def({ key: 'num', predicate: preds.int });

      specs.def({ key: 'even-and-num', predicate: specs.and(['even', 'num']) });
      const resp = specs.conform({ key: 'even-and-num', data: 12346 });
      expect(resp).toEqual(12346);
      const valid = specs.valid({ key: 'even-and-num', data: 223322 });
      expect(valid).toBeTruthy();
      const invalid = specs.valid({ key: 'even-and-num', data: true });
      expect(invalid).toBeFalsy();
    });
    it('should define spec with array of key preds', () => {
      specs.def({ key: 'odd-and-num', predicate: specs.and([{ key: 'odd', predicate: preds.odd }, { key: 'num', predicate: preds.int }]) });
      const resp = specs.conform({ key: 'odd-and-num', data: 1231 });
      expect(resp).toEqual(1231);
      const valid = specs.valid({ key: 'odd-and-num', data: 3333 });
      expect(valid).toBeTruthy();
      const invalid = specs.valid({ key: 'odd-and-num', data: true });
      expect(invalid).toBeFalsy();
    });
    it('should define composite spec using only preds', () => {
      specs.def({ key: 'zero-and-num', predicate: specs.and([{ predicate: preds.num }, { predicate: preds.zero }]) });
      const resp = specs.conform({ key: 'zero-and-num', data: 0 });
      expect(resp).toEqual(0);
    });
    it('should define composite spec using only preds functions', () => {
      specs.def({ key: 'num-and-odd', predicate: specs.and([preds.num, preds.odd]) });
      const resp = specs.conform({ key: 'num-and-odd', data: 1231 });
      expect(resp).toEqual(1231);
    });
  });
});
