import helpers from '../helpers';

import { canGenerateInteger, canGenerateNatural } from './integer';
import { canGenerateArray } from './array';


const { compose, stream, shrinkable } = helpers;

const numbers = [
  canGenerateNatural,
  canGenerateInteger
];

const arrays = [
  canGenerateArray
];

export default compose(
  ...arrays,
  ...numbers
)({ compose, stream, shrinkable });
