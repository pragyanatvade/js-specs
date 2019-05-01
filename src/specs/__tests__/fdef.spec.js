import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('fdef', () => {
    it('should work', () => {
      const testFn = x => x * x;
      specs.fdef({ key: testFn.name, args: specs.cat(['0', preds.int]), ret: preds.int });
      const testFnSpec = specs.specify(({ fn: testFn, key: testFn.name }));
      testFnSpec(2);
      // const resp = specs.conform({ fn: testFn, spec: fspec });
    });
  });
});
