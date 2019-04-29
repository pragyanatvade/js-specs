import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('mapOf', () => {
    it('When define spec with mapOf, Should conform if we pass valid values', () => {
      specs.def({ key: 'test-map-of', predicate: preds.mapOf(preds.int) });
      const resp = specs.conform({ key: 'test-map-of', data: { hello: 1, world: 32 } });
      expect(resp).toEqual({ hello: 1, world: 32 });
    });
    it('When define spec with mapOf, Should return invalid if we pass invalid values', () => {
      specs.def({ key: 'test-map-of', predicate: preds.mapOf(preds.int) });
      const resp = specs.conform({ key: 'test-map-of', data: { hello: 1, world: '32' } });
      expect(resp).toEqual(preds.invalid());
    });
  });
});
