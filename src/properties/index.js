import helpers from '../helpers';

import { canDefineSyncProp } from './sync';
import { canDefineAsyncProp } from './async';

const { compose } = helpers;

export default compose(
  canDefineSyncProp,
  canDefineAsyncProp
)(helpers);
