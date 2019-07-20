import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('collOf', () => {
    describe('keys', () => {
      it('When defing collection of even as spec, should return keys when invoked', () => {
        const sp = specs.def('even-coll', specs.collOf(preds.even));
        expect(sp.keys()).toEqual(['even-coll']);
      });
    });
    describe('conform', () => {
      it('When pass even predicate and list of integer, Should return invalid', () => {
        specs.def({ key: 'even', predicate: preds.even });
        specs.def({ key: 'even-coll', predicate: specs.collOf(preds.even) });
        const resp = specs.conform({ key: 'even-coll', data: [1, 2, 3] });
        expect(resp).toEqual(preds.invalid());
      });
      it('When pass even predicate and list of even numbers, Should return conformed value', () => {
        specs.def({ key: 'even', predicate: preds.even });
        specs.def({ key: 'even-coll', predicate: specs.collOf(preds.even) });
        const resp = specs.conform({ key: 'even-coll', data: [2, 4, 6] });
        expect(resp).toEqual([2, 4, 6]);
      });
    });
    describe('valid', () => {
      it('When pass even predicate and list of integer, Should return falsy', () => {
        specs.def({ key: 'even', predicate: preds.even });
        specs.def({ key: 'even-coll', predicate: specs.collOf('even') });
        const resp = specs.valid({ key: 'even-coll', data: [1, 2, 3] });
        expect(resp).toBeFalsy();
      });
      it('When pass even predicate and list of even numbers, Should return thuthy', () => {
        specs.def({ key: 'even', predicate: preds.even });
        specs.def({ key: 'even-coll', predicate: specs.collOf('even') });
        const resp = specs.valid({ key: 'even-coll', data: [2, 4, 6] });
        expect(resp).toBeTruthy();
      });
      it('When pass even predicate and list of even numbers, Should return truthy', () => {
        specs.def({ key: 'even-coll', predicate: specs.collOf(preds.even) });
        const resp = specs.valid({ key: 'even-coll', data: [2, 4, 6] });
        expect(resp).toBeTruthy();
      });
    });
  });
});
