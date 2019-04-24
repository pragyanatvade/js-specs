import helpers from '../helpers';

import { canDefineSyncProp } from './sync';

const { compose } = helpers;

export default compose(
  canDefineSyncProp
)(helpers);
