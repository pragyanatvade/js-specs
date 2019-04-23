import helpers from '../helpers';

import { canGenerateInteger, canGenerateNatural } from './integer';
import { canGenerateArray } from './array';
import { canGenerateBoolean } from './boolean';
import { canGenerateChar } from './character';
import { canGenerateString } from './string';
import { canGenerateConstant, canGenerateConstantFrom } from './constant';
import { canGenerateSet } from './set';
import { canGenerateTuple } from './tuple';
import { canGenerateDictionary } from './dictionary';
import { canGenerateOneOf } from './one-of';

const { compose } = helpers;

const numbers = [
  canGenerateNatural,
  canGenerateInteger
];

const arrays = [
  canGenerateArray
];

const booleans = [
  canGenerateBoolean
];

const chars = [
  canGenerateChar
];

const strings = [
  canGenerateString
];

const constants = [
  canGenerateConstant,
  canGenerateConstantFrom
];

const sets = [
  canGenerateSet
];

const tuples = [
  canGenerateTuple
];

const dicts = [
  canGenerateDictionary
];

const oneOfs = [
  canGenerateOneOf
];

export default compose(
  ...oneOfs,
  ...dicts,
  ...tuples,
  ...sets,
  ...constants,
  ...strings,
  ...chars,
  ...booleans,
  ...arrays,
  ...numbers
)(helpers);
