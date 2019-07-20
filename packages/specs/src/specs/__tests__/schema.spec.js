import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('schema', () => {
    describe('conform', () => {
      it('When we pass valid object, Should conform to defined schema', () => {
        const addr = {
          ':street': 'street',
          ':city': 'city',
          ':state': 'state',
          ':zip': 1234
        };

        const user = {
          ':id': 1234,
          ':first': 'first-name',
          ':last': 'last-name'
        };

        specs.def(':street', preds.string);
        specs.def(':city', preds.string);
        specs.def(':state', preds.string);
        specs.def(':zip', preds.int);
        specs.def(':addr', specs.schema([':street', ':city', ':state', ':zip']));
        const addrSpec = specs.conform(':addr', addr);
        expect(addrSpec).toEqual(addr);

        specs.def(':id', preds.int);
        specs.def(':first', preds.string);
        specs.def(':last', preds.string);
        specs.def(':user', specs.schema([':id', ':first', ':last']));
        const userSpec = specs.conform(':user', user);
        expect(userSpec).toEqual(user);
      });
    });
  });
});
