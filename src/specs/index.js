import _ from 'lodash';
import transduce from 'transducers-js';
import jsonpath from 'jsonpath';

import helpers from '../helpers';
import predicates from '../predicates';

import { canConform, canConformFn } from './conform';
import { canExplain, canExplainFn } from './explain';
import { canValidate } from './valid';
import { canDefineMultiple, canDefine, canDefineByPredicate } from './def';
import { canDefineAnd } from './and';
import { canDefineOr } from './or';
import { canCombine } from './combine';
import { canDefineKeys } from './keys';

const { compose } = helpers;

const registry = new Map();


export default compose(
  canDefineKeys,

  canDefineAnd,
  canDefineOr,
  canCombine,

  canDefineMultiple,
  canDefine,
  canDefineByPredicate,

  canValidate,

  canExplain,
  canExplainFn,

  canConform,
  canConformFn
)({
  ...helpers, registry, predicates, transduce, _, jsonpath
});
