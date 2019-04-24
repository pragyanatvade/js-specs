import _ from 'lodash';
import transduce from 'transducers-js';

import helpers from '../helpers';

import { canCheckNil } from './nil';
import { canCheckFinite } from './finite';
import { canCheckInteger } from './integer';
import { canCheckNumber } from './number';
import { canCheckZero } from './zero';

import { canCheckEven } from './even';
import { canCheckOdd } from './odd';
import { canCheckDivisibility } from './divisible';

import { canCheckInvalid } from './invalid';
import { canCheckString } from './string';

import { canCheckFunction } from './function';
import { canCheckSpec } from './spec';

import { canApplyAnd } from './and';
import { canApplyOr } from './or';

const { compose } = helpers;

export default compose(
  canApplyAnd,
  canApplyOr,

  canCheckSpec,
  canCheckFunction,

  canCheckInvalid,
  canCheckString,

  canCheckZero,
  canCheckOdd,
  canCheckEven,
  canCheckDivisibility,
  canCheckNumber,
  canCheckInteger,
  canCheckFinite,
  canCheckNil,
)({ _, transduce });
