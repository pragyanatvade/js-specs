import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('fdef', () => {
    it('When we pass single positional argument, Function should conform to defined spec', () => {
      const testFn = x => x * x;
      specs.fdef({ key: testFn.name, args: specs.cat(['0', preds.int]), ret: preds.int });

      const testFnSpec = specs.specify(({ fn: testFn, key: testFn.name }));
      const resp = testFnSpec(2);
      expect([...resp.args]).toEqual([2]);
      expect(resp.ret).toEqual(4);
    });
    it('When we pass double positional argument, Function should conform to defined spec', () => {
      const testFn = (x, y) => x * y;
      specs.fdef({ key: testFn.name, args: specs.cat(['0', preds.int, '1', preds.int]), ret: preds.int });

      const testFnSpec = specs.specify(({ fn: testFn, key: testFn.name }));
      const resp = testFnSpec(2, 4);
      expect([...resp.args]).toEqual([2, 4]);
      expect(resp.ret).toEqual(8);
    });
  });
});
