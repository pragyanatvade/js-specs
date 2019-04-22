import helpers from '../helpers';

import { canGenerateInteger, canGenerateNatural } from './integer';
import { canGenerateArray } from './array';
import { canGenerateBoolean } from './boolean';
import { canGenerateChar } from './character';
import { canGenerateConstant, canGenerateConstantFrom } from './constant';

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

const constants = [
  canGenerateConstant,
  canGenerateConstantFrom
];

export default compose(
  ...constants,
  ...chars,
  ...booleans,
  ...arrays,
  ...numbers
)(helpers);
