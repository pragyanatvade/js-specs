import specs from '..';
import preds from '../../predicates';

describe('specs', () => {
  describe('select', () => {
    it('Should work', () => {
      // const addr = {
      //   ':street': 'street',
      //   ':city': 'city',
      //   ':state': 'state',
      //   ':zip': 1234
      // };

      // const user = {
      //   ':id': 1234,
      //   ':first': 'first-name',
      //   ':last': 'last-name'
      // };

      specs.def(':street', preds.string);
      specs.def(':city', preds.string);
      specs.def(':state', preds.string);
      specs.def(':zip', preds.int);
      specs.def(':addr', specs.schema([':street', ':city', ':state', ':zip']));
      // specs.def(':selected-addr', specs.select(':addr', [':street', ':city']));
      const sp = specs.select(':addr', [':street', ':city']);
      console.log(sp.keys());
      // const addrSpec = specs.conform(':selected-addr', addr);
      // expect(addrSpec).toEqual(addr);

      // specs.def(':id', preds.int);
      // specs.def(':first', preds.string);
      // specs.def(':last', preds.string);
      // specs.def(':user', specs.schema([':id', ':first', ':last']));
      // const userSpec = specs.conform(':user', user);
      // expect(userSpec).toEqual(user);
    });
  });
});
