import helpers from '../helpers';

import { canReadConfig } from './read_config';
import { canCheckProp } from './check';
import { canRunIterator } from './run_iterator';
import { canValueIterator } from './value_iterator';


const { compose } = helpers;

export default compose(
  canCheckProp,
  canReadConfig,
  canRunIterator,
  canValueIterator
)(helpers);
