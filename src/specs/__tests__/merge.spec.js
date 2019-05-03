import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('merge', () => {
    describe('conform', () => {
      it('When we pass valid input, Should conform to value', () => {
        const dog = {
          ':animal/kind': 'dog',
          ':animal/says': 'woof',
          ':dog/tail?': true,
          ':dog/breed': 'retriever'
        };

        specs.def({ key: ':animal/kind', predicate: preds.string });
        specs.def({ key: ':animal/says', predicate: preds.string });
        specs.def({ key: ':animal/common', predicate: specs.keys({ req: [':animal/kind', ':animal/says'] }) });
        specs.def({ key: ':dog/tail?', predicate: preds.boolean });
        specs.def({ key: ':dog/breed', predicate: preds.string });
        specs.def({ key: ':animal/dog', predicate: specs.merge([':animal/common', specs.keys({ req: [':dog/tail?', ':dog/breed'] })]) });

        const resp = specs.conform({ key: ':animal/dog', data: dog });
        expect(resp).toEqual(dog);
      });
      it('When we pass invalid input, Should not conform to value', () => {
        const dog = {
          ':animal/kind': 'dog',
          ':animal/says': 'woof',
          ':dog/tail?': true,
          ':dog/breed': 1234
        };

        specs.def({ key: ':animal/kind', predicate: preds.string });
        specs.def({ key: ':animal/says', predicate: preds.string });
        specs.def({ key: ':animal/common', predicate: specs.keys({ req: [':animal/kind', ':animal/says'] }) });
        specs.def({ key: ':dog/tail?', predicate: preds.boolean });
        specs.def({ key: ':dog/breed', predicate: preds.string });
        specs.def({ key: ':animal/dog', predicate: specs.merge([':animal/common', specs.keys({ req: [':dog/tail?', ':dog/breed'] })]) });

        const resp = specs.conform({ key: ':animal/dog', data: dog });
        expect(resp[':dog/breed']).toEqual(preds.invalid());
      });
    });
    describe('valid', () => {
      it('When we pass valid input, Should return true', () => {
        const dog = {
          ':animal/kind': 'dog',
          ':animal/says': 'woof',
          ':dog/tail?': true,
          ':dog/breed': 'retriever'
        };

        specs.def({ key: ':animal/kind', predicate: preds.string });
        specs.def({ key: ':animal/says', predicate: preds.string });
        specs.def({ key: ':animal/common', predicate: specs.keys({ req: [':animal/kind', ':animal/says'] }) });
        specs.def({ key: ':dog/tail?', predicate: preds.boolean });
        specs.def({ key: ':dog/breed', predicate: preds.string });
        specs.def({ key: ':animal/dog', predicate: specs.merge([':animal/common', specs.keys({ req: [':dog/tail?', ':dog/breed'] })]) });

        const resp = specs.valid({ key: ':animal/dog', data: dog });
        expect(resp).toBeTruthy();
      });
      it('When we pass invalid valid input, Should return false', () => {
        const dog = {
          ':animal/kind': 'dog',
          ':animal/says': 'woof',
          ':dog/tail?': true,
          ':dog/breed': 1234
        };

        specs.def({ key: ':animal/kind', predicate: preds.string });
        specs.def({ key: ':animal/says', predicate: preds.string });
        specs.def({ key: ':animal/common', predicate: specs.keys({ req: [':animal/kind', ':animal/says'] }) });
        specs.def({ key: ':dog/tail?', predicate: preds.boolean });
        specs.def({ key: ':dog/breed', predicate: preds.string });
        specs.def({ key: ':animal/dog', predicate: specs.merge([':animal/common', specs.keys({ req: [':dog/tail?', ':dog/breed'] })]) });

        const resp = specs.valid({ key: ':animal/dog', data: dog });
        expect(resp).toBeFalsy();
      });
    });
  });
});
