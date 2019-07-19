import _ from 'lodash';
import helpers from '../helpers';

import { canReadConfig } from './read_config';
import { canCheckProp } from './check';
import { canRunIterator } from './run_iterator';
import { canValueIterator } from './value_iterator';
import { canExecute } from './execute';


const { compose } = helpers;

const runners = compose(
  canCheckProp,
  canReadConfig,
  canRunIterator,
  canValueIterator,
  canExecute
)({ helpers });

export default _.omit(runners, ['helpers']);
