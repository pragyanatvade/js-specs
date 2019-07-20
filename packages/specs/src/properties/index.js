import _ from 'lodash';
import helpers from '../helpers';

import { canDefineSyncProp } from './sync';
import { canDefineAsyncProp } from './async';

const { compose } = helpers;
const properties = compose(
  canDefineSyncProp,
  canDefineAsyncProp
)({ helpers });

export default _.omit(properties, ['helpers']);
