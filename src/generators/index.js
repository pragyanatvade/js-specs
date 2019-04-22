import helpers from '../helpers';

import { canGenerateInteger, canGenerateNatural } from './integer';
import { canGenerateArray } from './array';
import { canGenerateBoolean } from './boolean';


const {
  compose
} = helpers;

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

export default compose(
  ...booleans,
  ...arrays,
  ...numbers
)(helpers);
