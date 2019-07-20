import _ from 'lodash';
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
import { canGenerateOptions } from './options';
import { canGenerateFloat, canGenerateDouble } from './float';
import { canGenerateRecord } from './record';
import { canGenerateFreq } from './freq';

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

const options = [
  canGenerateOptions
];

const floats = [
  canGenerateFloat,
  canGenerateDouble
];

const records = [
  canGenerateRecord
];

const freqs = [
  canGenerateFreq
];

const generators = compose(
  ...freqs,
  ...records,
  ...floats,
  ...options,
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
)({ helpers });

export default _.omit(generators, ['helpers']);
