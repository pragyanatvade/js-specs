import _ from 'lodash';
import transduce from 'transducers-js';

import helpers from '../helpers';

import { canCheckNil } from './nil';
import { canCheckFinite } from './finite';
import { canCheckInteger } from './integer';
import { canCheckNumber } from './number';
import { canCheckZero } from './zero';
import { canCheckBoolean } from './bool';


import { canCheckEven } from './even';
import { canCheckOdd } from './odd';
import { canCheckDivisibility } from './divisible';

import { canCheckInvalid } from './invalid';
import { canCheckString } from './string';

import { canCheckFunction } from './function';
import { canCheckSpec } from './spec';

import { canApplyAnd } from './and';
import { canApplyOr } from './or';
import { canApplyCollOf } from './coll-of';
import { canApplyTuple } from './tuple';
import { canApplyMapOf } from './map-of';

const { compose } = helpers;

export default compose(
  canCheckBoolean,

  canApplyMapOf,
  canApplyTuple,
  canApplyCollOf,
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
