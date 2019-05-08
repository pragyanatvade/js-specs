import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('select', () => {
    describe('conform', () => {
      it('When select specific keys from the spec, Should conform with selected values only', () => {
        const addr = {
          ':street': 'street',
          ':city': 'city',
          ':state': 'state',
          ':zip': 1234
        };

        specs.def(':street', preds.string);
        specs.def(':city', preds.string);
        specs.def(':state', preds.string);
        specs.def(':zip', preds.int);
        specs.def(':addr', specs.schema([':street', ':city', ':state', ':zip']));
        specs.def(':selected-addr', specs.select(':addr', [':street', ':city']));
        const addrSpec = specs.conform(':selected-addr', addr);
        expect(addrSpec).toEqual({ ':street': addr[':street'], ':city': addr[':city'] });
      });
    });
  });
});
